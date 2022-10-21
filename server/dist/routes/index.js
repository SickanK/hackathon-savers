"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_js_1 = __importDefault(require("./user.js"));
const MainRouter = express_1.default.Router();
MainRouter.use('/user', user_js_1.default);
exports.default = MainRouter;
//# sourceMappingURL=index.js.map