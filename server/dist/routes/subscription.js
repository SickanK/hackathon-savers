"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const subscription_1 = require("../controllers/subscription");
const router = express_1.default.Router();
router.get('/session', auth_1.default, subscription_1.GetPaymentSession);
router.get('/portal', auth_1.default, subscription_1.GetCustomerPortal);
exports.default = router;
//# sourceMappingURL=subscription.js.map