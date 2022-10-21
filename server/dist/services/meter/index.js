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
exports.getMeterTree = exports.getMeter = exports.createMeter = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const getMeterTree_1 = require("./getMeterTree");
Object.defineProperty(exports, "getMeterTree", { enumerable: true, get: function () { return getMeterTree_1.getMeterTree; } });
const createMeter = (meterData, companyId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.meter.create({
        data: Object.assign(Object.assign({}, meterData), { companyId }),
    });
});
exports.createMeter = createMeter;
const getMeter = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.meter.findUnique({ where: { id } });
});
exports.getMeter = getMeter;
//# sourceMappingURL=index.js.map