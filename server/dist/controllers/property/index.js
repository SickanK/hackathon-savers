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
exports.DeleteProperty = exports.PutProperty = exports.PostProperty = exports.GetProperty = void 0;
const logger_1 = require("../../config/logger");
const property_1 = require("../../services/property");
const GetProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            throw new Error('No id was provided');
        }
        const property = yield (0, property_1.getProperty)(id);
        if (!property) {
            throw new Error('No property was found');
        }
        property.preview = false;
        res.status(200).send({
            property,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get property route failed');
        res.status(400).send({
            error: error.message,
        });
    }
});
exports.GetProperty = GetProperty;
const PostProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const property = req.body;
    const { companyId } = req.user;
    try {
        if (!property || !companyId) {
            throw new Error('All fields have to be provided');
        }
        const Property = yield (0, property_1.CreateProperty)(property, companyId);
        if (!Property) {
            throw new Error('Could not create property');
        }
        res.status(201).send({
            propery: Property,
            message: 'Created properties',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Post property route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PostProperty = PostProperty;
const PutProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    const property = req.body;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const updatedProperty = yield (0, property_1.updateProperty)(property, id, companyId);
        if (!updatedProperty) {
            throw new Error('Something went wrong');
        }
        res.status(204).send({
            property: property_1.updateProperty,
            message: 'Property updated',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Put property route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PutProperty = PutProperty;
const DeleteProperty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const deletedProperty = yield (0, property_1.deleteProperty)(id, companyId);
        if (!deletedProperty) {
            throw new Error('Something went wrong');
        }
        res.status(202).send({
            property: deletedProperty,
            message: 'Property deleted',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Delete property route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.DeleteProperty = DeleteProperty;
//# sourceMappingURL=index.js.map