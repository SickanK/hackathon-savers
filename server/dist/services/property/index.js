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
exports.updateProperty = exports.deleteProperty = exports.CreateProperty = exports.getProperty = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const CreateProperty = (propertyData, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.property.create({
        data: Object.assign(Object.assign({}, propertyData), { companyId }),
    });
});
exports.CreateProperty = CreateProperty;
const getProperty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.property.findUnique({
        where: { id },
        include: { buildings: { include: { spaces: { include: { meters: true } }, meters: true } } },
    });
});
exports.getProperty = getProperty;
const deleteProperty = (id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.$transaction([
        prisma_1.default.space.deleteMany({
            where: {
                Building: {
                    propertyId: { isSet: true, equals: id },
                    OR: [{ managementUnitId: { equals: null } }, { managementUnitId: { isSet: false } }],
                },
            },
        }),
        prisma_1.default.building.deleteMany({
            where: {
                propertyId: { isSet: true, equals: id },
                OR: [{ managementUnitId: { equals: null } }, { managementUnitId: { isSet: false } }],
            },
        }),
        prisma_1.default.property.deleteMany({ where: { id, companyId } }),
    ]);
});
exports.deleteProperty = deleteProperty;
const updateProperty = (propertyData, id, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.property.updateMany({ data: propertyData, where: { id, companyId } });
});
exports.updateProperty = updateProperty;
//# sourceMappingURL=index.js.map