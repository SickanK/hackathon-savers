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
exports.DeleteManagementUnit = exports.PutManagementUnit = exports.PostManagementUnit = exports.GetManagementUnit = void 0;
const logger_1 = require("../../config/logger");
const managementUnit_1 = require("../../services/managementUnit");
const GetManagementUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const managementUnit = yield (0, managementUnit_1.getManagementUnit)(id);
        if (!managementUnit) {
            throw new Error('Could not find a managementUnit');
        }
        res.status(200).send({
            managementUnit,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get managementUnit route failed');
        res.status(400).send({
            error: 'Could not get properties',
        });
    }
});
exports.GetManagementUnit = GetManagementUnit;
const PostManagementUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO Validera data
    const managementUnit = req.body;
    const { companyId } = req.user;
    try {
        if (!companyId || !managementUnit.name) {
            throw new Error('All fields have to be provided');
        }
        const ManagementObject = yield (0, managementUnit_1.createManagementUnit)(managementUnit, companyId);
        if (!ManagementObject) {
            throw new Error('Could not create ManagementObject');
        }
        res.status(201).send({
            ManagementObject,
            message: 'Created ManagementObject',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Post managementUnit route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PostManagementUnit = PostManagementUnit;
const PutManagementUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    const ManagementUnit = req.body;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const updatedManagementUnit = yield (0, managementUnit_1.updateManagementUnit)(ManagementUnit, id, companyId);
        if (!updatedManagementUnit) {
            throw new Error('Something went wrong');
        }
        res.status(204).send({
            managementUnit: updatedManagementUnit,
            message: 'Property updated',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Put managementUnit route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PutManagementUnit = PutManagementUnit;
const DeleteManagementUnit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const companyId = req.user.companyId;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const deletedManagementUnit = yield (0, managementUnit_1.deleteManagementUnit)(id, companyId);
        if (!deletedManagementUnit) {
            throw new Error('Something went wrong');
        }
        res.status(202).send({
            managementUnit: deletedManagementUnit,
            message: 'managementUnit deleted',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Delete managementUnit route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.DeleteManagementUnit = DeleteManagementUnit;
//# sourceMappingURL=index.js.map