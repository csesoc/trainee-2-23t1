"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("../service/auth"));
const calendar_1 = __importDefault(require("../service/calendar"));
const follow_1 = __importDefault(require("../service/follow"));
const hello_1 = __importDefault(require("../service/hello"));
const search_1 = __importDefault(require("../service/search"));
const tide_1 = __importDefault(require("../service/tide"));
const user_1 = __importDefault(require("../service/user"));
const provider_1 = require("./provider");
const appRouter = provider_1.trpc.router({
    hello: hello_1.default,
    auth: auth_1.default,
    calendar: calendar_1.default,
    user: user_1.default,
    search: search_1.default,
    follow: follow_1.default,
    tide: tide_1.default,
});
exports.default = appRouter;
