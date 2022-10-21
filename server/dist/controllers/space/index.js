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
exports.PutSpace = exports.DeleteSpace = exports.PostSpace = exports.GetSpace = void 0;
const space_1 = require("../../services/space");
const logger_1 = require("../../config/logger");
const GetSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const space = yield (0, space_1.getSpace)(id);
        if (!space) {
            throw new Error('');
        }
        res.status(200).send({
            space,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get space route failed');
        res.status(400).send({
            error,
        });
    }
});
exports.GetSpace = GetSpace;
const PostSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { space } = req.body;
    const { companyId } = req.user;
    try {
        if (!space) {
            throw new Error('All fields have to be provided');
        }
        const spaces = yield (0, space_1.createSpace)(space, space.buildingId, companyId);
        if (!spaces) {
            throw new Error('No space was created');
        }
        res.status(201).send({
            spaces,
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Post space route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PostSpace = PostSpace;
const PutSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    const space = req.body;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const updatedSpace = yield (0, space_1.updateSpace)(space, id, companyId);
        if (!updatedSpace) {
            throw new Error('Something went wrong');
        }
        res.status(204).send({
            space: updatedSpace,
            message: 'Space updated',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Put space route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.PutSpace = PutSpace;
const DeleteSpace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { companyId } = req.user;
    try {
        if (!id) {
            throw new Error('No input was provided');
        }
        const deletedSpace = yield (0, space_1.deleteSpace)(id, companyId);
        if (!deletedSpace) {
            throw new Error('Something went wrong');
        }
        res.status(202).send({
            space: deletedSpace,
            message: 'Space deleted',
        });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error: error.message }, 'Delete space route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.DeleteSpace = DeleteSpace;
//# sourceMappingURL=index.js.map