"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkPasswordMatch = exports.FindUserByEmail = exports.VerifySessionToken = exports.GetUserFromToken = exports.CreateSessionToken = exports.CreateUser = exports.FindUserByID = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jose = __importStar(require("jose"));
const prisma_1 = __importDefault(require("../../database/prisma"));
const jwtKey = '#$#034283!4$£@123mDfe_&_@$_&??+';
const key = new TextEncoder().encode(jwtKey);
const FindUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({ where: { id } });
});
exports.FindUserByID = FindUserByID;
const FindUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({ where: { email: email.toLowerCase() } });
});
exports.FindUserByEmail = FindUserByEmail;
const CreateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield FindUserByEmail(user.email);
    if (userExist) {
        throw new Error('User already exists');
    }
    const password = yield bcryptjs_1.default.hash(user.password, 10);
    const createdUser = yield prisma_1.default.user.create({
        data: {
            email: user.email.toLowerCase(),
            name: user.email,
            password,
        },
    });
    createdUser.password = '';
    return createdUser;
});
exports.CreateUser = CreateUser;
const CreateSessionToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield new jose.SignJWT({ aud: userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(key);
    return token;
});
exports.CreateSessionToken = CreateSessionToken;
const VerifySessionToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jose.jwtVerify(token, key);
});
exports.VerifySessionToken = VerifySessionToken;
const GetUserFromToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = yield VerifySessionToken(token);
    if (!decoded) {
        throw new Error();
    }
    const userId = decoded.payload.aud;
    const user = yield FindUserByID(userId);
    if (!user) {
        throw new Error('User was not found');
    }
    return user;
});
exports.GetUserFromToken = GetUserFromToken;
const checkPasswordMatch = (password, hashPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, hashPassword);
});
exports.checkPasswordMatch = checkPasswordMatch;
//# sourceMappingURL=index.js.map