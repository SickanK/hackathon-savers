"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../services/user/index");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token || req.headers.authorization;
        if (!token) {
            throw new Error('UnAuthenticated');
        }
        const user = (yield (0, index_1.GetUserFromToken)(token));
        if (!user) {
            throw new Error('UnAuthenticated');
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.clearCookie('token');
        res.status(401).send({
            message: 'Not authenticated',
        });
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map