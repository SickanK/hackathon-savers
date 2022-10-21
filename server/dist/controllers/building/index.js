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
exports.DeleteBuilding = exports.PutBuilding = exports.GetBuilding = exports.PostBuilding = void 0;
const building_1 = require("../../services/building");
const logger_1 = require("../../config/logger");
const PostBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { building } = req.body;
    const { companyId } = req.user;
    try {
        if (!building) {
            throw new Error('No buildings was provided');
        }
        if (!building.propertyId && !building.managementUnitId) {
            throw new Error('No relationship was provided');
        }
        const Building = yield (0, building_1.createBuildings)(building, companyId);
        if (!Building) {
            throw new Error('No building was created');
        }
        res.status(201).send({
            Building,
            message: 'Created building',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Post building route failed');
        res.status(400).send({
            message: 'Could not create Building',
        });
    }
});
exports.PostBuilding = PostBuilding;
const GetBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buildingId = req.params.id;
        const building = yield (0, building_1.getBuilding)(buildingId);
        if (!building) {
            throw new Error('Building was not found');
        }
        res.status(200).send({
            building,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get building route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.GetBuilding = GetBuilding;
const PutBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    const building = req.body;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const updatedBuilding = yield (0, building_1.updateBuilding)(building, id, companyId);
        if (!updatedBuilding.count) {
            throw new Error('Something went wrong');
        }
        res.status(204).send({
            building: updatedBuilding,
            message: 'Building updated',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Put building route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PutBuilding = PutBuilding;
const DeleteBuilding = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    console.log('delete');
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const deletedBuilding = yield (0, building_1.deleteBuilding)(id, companyId);
        if (!deletedBuilding.count) {
            throw new Error('Building was not successfully deleted');
        }
        res.status(202).send({
            property: deletedBuilding,
            message: 'building deleted',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Delete building route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.DeleteBuilding = DeleteBuilding;
//# sourceMappingURL=index.js.map