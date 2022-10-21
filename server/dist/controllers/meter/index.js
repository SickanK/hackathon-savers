"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMeterTree = exports.PostMeter = exports.GetMeter = void 0;
const meter_1 = require("../../services/meter");
const logger_1 = require("../../config/logger");
const PostMeter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { meter } = req.body;
    const { companyId } = req.user;
    try {
        if (!meter) {
            throw new Error('No buildings was provided');
        }
        if (!meter.propertyId && !meter.buildingId && !meter.spaceId) {
            throw new Error('No relationship was provided');
        }
        const Meter = yield (0, meter_1.createMeter)(meter, companyId);
        if (!Meter) {
            throw new Error('Meters was not created');
        }
        res.status(200).send({
            meter: Meter,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Post meter route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PostMeter = PostMeter;
const GetMeter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error('No id was provided');
        }
        const meter = yield (0, meter_1.getMeter)(id);
        if (!meter) {
            throw new Error('Meter was not found');
        }
        res.status(200).send({
            meter,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get managementUnit route failed');
        res.status(400).send({
            error: error.message,
        });
    }
});
exports.GetMeter = GetMeter;
const GetMeterTree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { objectId, objectType } = req.query;
    try {
        if (!objectId || !objectType) {
            throw new Error('Query params need to be provided');
        }
        const meterTree = yield (0, meter_1.getMeterTree)(objectType, objectId);
        res.status(200).send({
            meterTree,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get meter tree route failed');
        res.status(400).send({ message: error.message });
    }
});
exports.GetMeterTree = GetMeterTree;
//# sourceMappingURL=index.js.map