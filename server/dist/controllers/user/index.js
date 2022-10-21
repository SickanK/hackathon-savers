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
exports.updateLimit = exports.registerUser = exports.logout = exports.GetUser = exports.LoginUser = void 0;
const prisma_1 = __importDefault(require("../../database/prisma"));
const index_1 = require("../../services/user/index");
const updateLimit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit } = req.body;
        yield prisma_1.default.user.update({ where: { id: req.user.id }, data: { limit: limit } });
        res.status(201).send({
            message: 'Limit set',
        });
    }
    catch (error) {
        res.status(400).send({
            message: 'Limits was not successfully created',
        });
    }
});
exports.updateLimit = updateLimit;
// const updateNumbers: RequestHandler = async (req, res) => {
//   try {
//     const { numbers } = req.query as unknown as { numbers: number[] };
//     console.log('few');
//     console.log(numbers);
//     await prisma.user.update({ where: { id: req.user.id }, data: { numbers } });
//     res.status(200).send({
//       message: 'Numbers updated',
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({
//       message: 'Numbers was not successfully updated',
//     });
//   }
// };
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('frw');
    try {
        const { email, name, password } = req.body;
        if (!email || !password || !name) {
            throw new Error('Not all data provided');
        }
        const user = yield (0, index_1.CreateUser)({ email, name, password });
        res.status(201).send(user);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            message: error.message,
            error: true,
        });
    }
});
exports.registerUser = registerUser;
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw new Error('No user was found');
        }
        res.status(200).send({
            user: req.user,
        });
    }
    catch (error) {
        res.status(404).send({
            message: 'User was not found',
        });
    }
});
exports.GetUser = GetUser;
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error('All fields must be provided');
        }
        const user = yield (0, index_1.FindUserByEmail)(email);
        if (!user) {
            throw new Error('Email or password is not correct');
        }
        if (!(yield (0, index_1.checkPasswordMatch)(password, user.password))) {
            throw new Error('Email or password is not correct');
        }
        const token = yield (0, index_1.CreateSessionToken)(user.id);
        res.cookie('token', token, {
            httpOnly: true,
        });
        res.status(200).send({
            message: 'User is logged in',
        });
    }
    catch (error) {
        res.status(400).send({
            error: error.message,
        });
    }
});
exports.LoginUser = LoginUser;
const logout = (_, res) => {
    try {
        res.clearCookie('token').send();
    }
    catch (error) {
        res.status(400).send({
            message: error.message,
        });
    }
};
exports.logout = logout;
//# sourceMappingURL=index.js.map