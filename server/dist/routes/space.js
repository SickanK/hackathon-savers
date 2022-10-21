"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const space_1 = require("../controllers/space");
const subscriptionAuth_1 = __importDefault(require("../middleware/subscriptionAuth"));
const router = express_1.default.Router();
router.get('/:id', subscriptionAuth_1.default, space_1.GetSpace);
router.post('/', subscriptionAuth_1.default, space_1.PostSpace);
router.delete('/:id', subscriptionAuth_1.default, space_1.DeleteSpace);
router.put('/:id', subscriptionAuth_1.default, space_1.PutSpace);
exports.default = router;
//# sourceMappingURL=space.js.map