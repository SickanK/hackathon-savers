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
exports.setCompanyNotPayed = exports.getStripeProduct = exports.createDemoSubscription = exports.createPortalSession = exports.createPaymentSession = exports.createCustomer = void 0;
const stripe_1 = __importDefault(require("../../config/stripe"));
const prisma_1 = __importDefault(require("../../database/prisma"));
// const plans = {
//   basic: {
//     monthly: 'price_1LfmHcHfmpXeB9za3Oz5XATG',
//     annual: 'price_1LfmHcHfmpXeB9za6JW83cMf',
//   },
//   professional: {
//     monthly: 'price_1LfmJBHfmpXeB9zaaHRipx9R',
//     annual: 'price_1LfmJBHfmpXeB9zaruz37bTx',
//   },
//   enterprise: {
//     monthly: 'price_1LfmKQHfmpXeB9zaH6GefLTn',
//     annual: 'price_1LfmKQHfmpXeB9za2BYvXHon',
//   },
// };
const setCompanyNotPayed = (companyId, planName) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.company.update({
        where: { id: companyId },
        data: { subscription: { status: 'NOT_PAYED', subscriptionId: '', plan: planName } },
    });
});
exports.setCompanyNotPayed = setCompanyNotPayed;
const createCustomer = ({ name, companyId, email, }) => __awaiter(void 0, void 0, void 0, function* () {
    let testClock = null;
    // Create test clock if development
    if (process.env.NODE_ENV === 'development') {
        testClock = yield stripe_1.default.testHelpers.testClocks.create({
            frozen_time: Math.round(Date.now() / 1000),
        });
    }
    const customer = yield stripe_1.default.customers.create({ name, email, metadata: { companyId }, test_clock: testClock === null || testClock === void 0 ? void 0 : testClock.id });
    yield prisma_1.default.company.update({ where: { id: companyId }, data: { stripeId: customer.id } });
    return customer;
});
exports.createCustomer = createCustomer;
const getStripeProduct = (priceId) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = yield (yield stripe_1.default.prices.retrieve(priceId)).product;
    return yield stripe_1.default.products.retrieve(productId.toString());
});
exports.getStripeProduct = getStripeProduct;
const createDemoSubscription = (demoPrice, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield stripe_1.default.subscriptions.create({
        cancel_at_period_end: true,
        customer: customerId,
        items: [{ price: demoPrice }],
        trial_period_days: 14,
    });
    return subscription;
});
exports.createDemoSubscription = createDemoSubscription;
// const updateSubscription
const createPaymentSession = (priceId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe_1.default.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        customer: customerId,
        // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
        success_url: 'http://localhost:3000/app?session_id={CHECKOUT_SESSION_ID}&checkoutSuccess=true',
        cancel_url: 'http://localhost:3000/join',
        // automatic_tax: { enabled: true }
    });
});
exports.createPaymentSession = createPaymentSession;
const createPortalSession = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield stripe_1.default.billingPortal.sessions.create({
        customer: customerId,
        return_url: 'http://localhost:3000/settings',
    });
});
exports.createPortalSession = createPortalSession;
//# sourceMappingURL=index.js.map