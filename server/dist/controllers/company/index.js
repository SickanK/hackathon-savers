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
exports.RegisterCompany = void 0;
const company_1 = require("../../services/company");
const index_1 = require("../../services/user/index");
const mixpanel_1 = require("../../config/mixpanel");
const logger_1 = require("../../config/logger");
const subscription_1 = require("../../services/subscription");
const RegisterCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, company, priceId } = req.body;
        const demo = !priceId;
        const userExists = yield (0, index_1.FindUserByEmail)(user.email);
        if (userExists) {
            throw new Error('User is already created');
        }
        const createdCompany = yield (0, company_1.createCompany)({
            user,
            company,
        });
        if (!createdCompany.id) {
            throw new Error('Already registered');
        }
        const customer = yield (0, subscription_1.createCustomer)({ name: company.name, companyId: createdCompany.id, email: company.email });
        let session;
        if (demo) {
            // Create a demo with the demo product in stripe
            yield (0, subscription_1.createDemoSubscription)('price_1LgShzHfmpXeB9zaI1fbWLTJ', customer.id);
            const token = yield (0, index_1.CreateSessionToken)(createdCompany.users[0].id);
            res.cookie('token', token);
        }
        else {
            const product = yield (0, subscription_1.getStripeProduct)(priceId);
            const planName = product.name.toUpperCase();
            yield (0, subscription_1.setCompanyNotPayed)(createdCompany.id, planName);
            session = yield (0, subscription_1.createPaymentSession)(priceId, customer.id);
        }
        if (demo) {
            res.status(201).send({
                message: 'Registered Company',
                demo: true,
            });
        }
        else {
            res.status(201).send({
                url: session === null || session === void 0 ? void 0 : session.url,
                demo: false,
            });
        }
        (0, mixpanel_1.track)('Company was created', {
            name: company.name,
            email: user.email,
            createdUser: user.id,
        });
        (0, mixpanel_1.createMixpanelUser)(createdCompany.users[0].id, {
            $first_name: createdCompany.users[0].name,
            $email: createdCompany.users[0].email,
            $created: new Date().toISOString(),
            company: createdCompany.id,
            role: createdCompany.users[0].role,
            plan: 'basic',
            event: 'Created with company',
        });
    }
    catch (error) {
        console.log(error);
        logger_1.logger.error({ error }, 'Register company route failed');
        res.status(400).send({
            message: error.message,
        });
    }
});
exports.RegisterCompany = RegisterCompany;
//# sourceMappingURL=index.js.map