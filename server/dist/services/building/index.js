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
exports.updateBuilding = exports.deleteBuilding = exports.createBuildings = exports.getBuilding = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const createBuildings = (buildingData, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.building.create({
        data: Object.assign(Object.assign({}, buildingData), { companyId }),
    });
});
exports.createBuildings = createBuildings;
const getBuilding = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.building.findUnique({
        where: { id },
        include: { spaces: true, Property: { select: { name: true, id: true } } },
    });
});
exports.getBuilding = getBuilding;
const updateBuilding = (buildingPatch, id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.building.updateMany({ data: buildingPatch, where: { id, companyId } });
});
exports.updateBuilding = updateBuilding;
const deleteBuilding = (id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.building.deleteMany({ where: { companyId, id } });
});
exports.deleteBuilding = deleteBuilding;
//# sourceMappingURL=index.js.map