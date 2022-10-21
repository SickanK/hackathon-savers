"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subscriptionAuth_1 = __importDefault(require("../middleware/subscriptionAuth"));
const meter_1 = require("../controllers/meter");
const router = express_1.default.Router();
router.get('/tree', subscriptionAuth_1.default, meter_1.GetMeterTree);
router.get('/:id', subscriptionAuth_1.default, meter_1.GetMeter);
router.post('/', subscriptionAuth_1.default, meter_1.PostMeter);
// router.post('/datapoints', postMeterDataPoint);
exports.default = router;
//# sourceMappingURL=meter.js.map