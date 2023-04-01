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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const trpcAdapter = __importStar(require("@trpc/server/adapters/express"));
const router_1 = __importDefault(require("./src/utils/router"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const app = (0, express_1.default)();
const createContext = ({ req, res }) => {
    var _a;
    if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
        return { userId: null };
    }
    const token = req.headers.authorization.split(" ")[1];
    if (typeof token === 'undefined' || token.trim() === "") {
        return { userId: null };
    }
    const payload = jsonwebtoken_1.default.verify(token, config_1.JwtSecret); // lazy
    return { userId: payload.userId };
};
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use('/trpc', trpcAdapter.createExpressMiddleware({
    router: router_1.default,
    createContext
}));
app.listen(8000, () => {
    console.log(`* Server is listening on port 8000`);
});
