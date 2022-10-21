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
exports.GetPropertyBase = void 0;
const index_1 = require("../../services/propertyBase/index");
const logger_1 = require("../../config/logger");
const GetPropertyBase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { properties, ManagementUnits } = yield (0, index_1.GetPropertyTree)(req.user.companyId);
        res
            .status(200)
            .send({ property: (0, index_1.propertyTreeToBase)(properties), managementUnit: (0, index_1.propertyTreeToBase)(ManagementUnits) });
    }
    catch (error) {
        logger_1.logger.error({ userId: req.user.id, error }, 'Get property route failed');
        res.status(400).send({
            error: error.message,
        });
    }
});
exports.GetPropertyBase = GetPropertyBase;
//# sourceMappingURL=index.js.map