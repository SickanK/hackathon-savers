"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const company_1 = require("../controllers/company");
// import auth from '../middleware/auth';
router.post('/', company_1.RegisterCompany);
// router.post('/PropertyCompany', auth, PostPropertyCompany);
exports.default = router;
//# sourceMappingURL=company.js.map