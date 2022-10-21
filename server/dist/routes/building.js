"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const building_1 = require("../controllers/building");
const subscriptionAuth_1 = __importDefault(require("../middleware/subscriptionAuth"));
const router = express_1.default.Router();
router.post('/', subscriptionAuth_1.default, building_1.PostBuilding);
router.get('/:id', subscriptionAuth_1.default, building_1.GetBuilding);
router.delete('/:id', subscriptionAuth_1.default, building_1.DeleteBuilding);
router.put('/:id', subscriptionAuth_1.default, building_1.PutBuilding);
exports.default = router;
//# sourceMappingURL=building.js.map