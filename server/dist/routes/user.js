"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = require("../controllers/user/index");
const auth_1 = __importDefault(require("../middleware/auth"));
router.get('/', auth_1.default, index_1.GetUser);
router.post('/', index_1.registerUser);
router.post('/login', index_1.LoginUser);
router.post('/logout', index_1.logout);
router.post('/limit', auth_1.default, index_1.updateLimit);
// router.post('/numbers', auth, updateNumbers);
exports.default = router;
//# sourceMappingURL=user.js.map