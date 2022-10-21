"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyBase_1 = require("../controllers/propertyBase");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/', auth_1.default, propertyBase_1.GetPropertyBase);
exports.default = router;
//# sourceMappingURL=propertyBase.js.map