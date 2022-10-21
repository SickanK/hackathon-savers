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
exports.GetCustomerPortal = exports.GetPaymentSession = void 0;
const subscription_1 = require("../../services/subscription");
const logger_1 = require("../../config/logger");
const stripe_1 = __importDefault(require("../../config/stripe"));
const GetPaymentSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const customerID = user.Company.stripeId;
        if (!customerID) {
            throw new Error('No stripe user was found, contact support');
        }
        if (!user.Company.subscription) {
            throw new Error('No stripe subscription was found, contact support');
        }
        // @ts-ignore
        const stripeSub = yield stripe_1.default.subscriptions.list({ customer: customerID });
        const subscriptionsPriceIds = stripeSub.data.map((data) => data.plan.id);
        const session = yield (0, subscription_1.createPaymentSession)(subscriptionsPriceIds[0], customerID);
        res.status(303).send({
            url: session.url,
            message: 'Payment session was created',
        });
    }
    catch (error) {
        console.log(error);
        logger_1.logger.error({ error }, 'Get payment session failed');
        res.status(400).send({
            message: 'Payment session could not be created',
        });
    }
});
exports.GetPaymentSession = GetPaymentSession;
const GetCustomerPortal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerID = req.user.Company.stripeId;
        const session = yield (0, subscription_1.createPortalSession)(customerID);
        res.status(200).send({
            url: session.url,
            message: 'Portal url created',
        });
    }
    catch (error) {
        logger_1.logger.error({ error }, 'Create portal session failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.GetCustomerPortal = GetCustomerPortal;
//# sourceMappingURL=index.js.map