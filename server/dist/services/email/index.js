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
exports.sendInviteEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
// Load the AWS SDK for Node.js
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Set the region
aws_sdk_1.default.config.update({ region: 'eu-north-1' });
// Create an SQS service object
const sqs = new aws_sdk_1.default.SQS({ apiVersion: '2012-11-05' });
// const token = process.env.SENDGRID_API_KEY as string;
// const sender = process.env.SENDGRID_SENDER as string;
mail_1.default.setApiKey('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');
const sendInviteEmail = ({ companyName, link }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Sending email');
    const params = {
        MessageBody: JSON.stringify({
            templateId: 'd-60dfb71b949e47368f265f3e863bde4a',
            dynamicTemplateData: { link, companyName },
            to: 'Max.svensson@outlook.com',
        }),
        QueueUrl: 'https://sqs.eu-north-1.amazonaws.com/847553695478/email-service',
    };
    console.log(yield sqs.sendMessage(params));
});
exports.sendInviteEmail = sendInviteEmail;
//# sourceMappingURL=index.js.map