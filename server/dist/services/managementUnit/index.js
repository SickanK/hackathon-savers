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
exports.updateManagementUnit = exports.deleteManagementUnit = exports.createManagementUnit = exports.getManagementUnit = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const createManagementUnit = (ManagementUnitData, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.managementUnit.create({
        data: Object.assign(Object.assign({}, ManagementUnitData), { companyId }),
    });
});
exports.createManagementUnit = createManagementUnit;
const getManagementUnit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.managementUnit.findUnique({ where: { id } });
});
exports.getManagementUnit = getManagementUnit;
const deleteManagementUnit = (id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction([
        prisma_1.default.space.deleteMany({
            where: {
                Building: {
                    managementUnitId: { isSet: true, equals: id },
                    OR: [{ managementUnitId: { equals: null } }, { managementUnitId: { isSet: false } }],
                },
            },
        }),
        prisma_1.default.building.deleteMany({
            where: {
                managementUnitId: { isSet: true, equals: id },
                OR: [{ managementUnitId: { equals: null } }, { managementUnitId: { isSet: false } }],
            },
        }),
        prisma_1.default.managementUnit.deleteMany({ where: { id, companyId } }),
    ]);
});
exports.deleteManagementUnit = deleteManagementUnit;
const updateManagementUnit = (managementUnitData, id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.managementUnit.updateMany({ data: managementUnitData, where: { id, companyId } });
});
exports.updateManagementUnit = updateManagementUnit;
//# sourceMappingURL=index.js.map