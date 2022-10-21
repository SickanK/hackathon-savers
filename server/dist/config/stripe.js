"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default('sk_test_51LezS3HfmpXeB9zad6hpZxaI2FjimBPh4jupZc6bjcsEljGyeh0bJjE0iZodvQAJQAeFnOHXVjN3mq6C6pKZrWZO00hTAwKiOj', {
    typescript: true,
    apiVersion: '2022-08-01',
});
exports.default = stripe;
//# sourceMappingURL=stripe.js.map