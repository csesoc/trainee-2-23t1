"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./service/auth"));
const hello_1 = __importDefault(require("./service/hello"));
const trpc_provider_1 = require("./trpc_provider");
const appRouter = trpc_provider_1.trpc.router({
    hello: hello_1.default,
    auth: auth_1.default,
});
exports.default = appRouter;
