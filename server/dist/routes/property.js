"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const property_1 = require("../controllers/property");
const subscriptionAuth_1 = __importDefault(require("../middleware/subscriptionAuth"));
const router = express_1.default.Router();
router.post('/', subscriptionAuth_1.default, property_1.PostProperty);
router.get('/:id', subscriptionAuth_1.default, property_1.GetProperty);
router.delete('/:id', subscriptionAuth_1.default, property_1.DeleteProperty);
router.put('/:id', subscriptionAuth_1.default, property_1.PutProperty);
exports.default = router;
//# sourceMappingURL=property.js.map