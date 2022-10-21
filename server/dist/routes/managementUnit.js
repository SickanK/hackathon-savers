"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionAuth_1 = __importDefault(require("../middleware/subscriptionAuth"));
const managementUnit_1 = require("../controllers/managementUnit");
const router = express_1.default.Router();
// router.get("/properties", PropertyController.getProperties);
router.post('/', subscriptionAuth_1.default, managementUnit_1.PostManagementUnit);
router.get('/:id', subscriptionAuth_1.default, managementUnit_1.GetManagementUnit);
router.delete('/:id', subscriptionAuth_1.default, managementUnit_1.DeleteManagementUnit);
router.put('/:id', subscriptionAuth_1.default, managementUnit_1.PutManagementUnit);
exports.default = router;
//# sourceMappingURL=managementUnit.js.map