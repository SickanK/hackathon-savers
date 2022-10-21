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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSpace = exports.deleteSpace = exports.createSpace = exports.getSpace = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const createSpace = (spacesData, buildingId, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.space.create({
        data: Object.assign(Object.assign({}, spacesData), { buildingId, companyId }),
    });
});
exports.createSpace = createSpace;
const getSpace = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.space.findUnique({ where: { id } });
});
exports.getSpace = getSpace;
const updateSpace = (spacePatch, id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.space.updateMany({ data: spacePatch, where: { id, companyId } });
});
exports.updateSpace = updateSpace;
const deleteSpace = (id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.space.deleteMany({ where: { id, Building: { Property: { companyId } } } });
});
exports.deleteSpace = deleteSpace;
//# sourceMappingURL=index.js.map