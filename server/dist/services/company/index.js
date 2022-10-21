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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCompany = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const client_1 = require(".prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createCompany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = data.user;
    const company = data.company;
    user.password = yield bcryptjs_1.default.hash(user.password, 10);
    const CreatedCompany = yield prisma_1.default.company.create({
        data: Object.assign(Object.assign({}, company), { users: { create: Object.assign(Object.assign({}, user), { email: user.email.toLowerCase(), role: client_1.Role.ADMIN }) } }),
        include: { users: true },
    });
    return CreatedCompany;
});
exports.createCompany = createCompany;
//# sourceMappingURL=index.js.map