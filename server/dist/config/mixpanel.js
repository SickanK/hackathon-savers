"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMixpanelUser = exports.track = void 0;
const mixpanel_1 = __importDefault(require("mixpanel"));
const mixpanel = mixpanel_1.default.init('d5a350605ec748202591b789f510a7de', {
    protocol: 'http',
});
const track = (event, properties) => {
    if (process.env.NODE_ENV === 'production') {
        mixpanel.track(event, properties);
    }
};
exports.track = track;
const createMixpanelUser = (id, properties) => {
    if (process.env.NODE_ENV === 'production') {
        mixpanel.people.set(id, properties);
    }
};
exports.createMixpanelUser = createMixpanelUser;
//# sourceMappingURL=mixpanel.js.map