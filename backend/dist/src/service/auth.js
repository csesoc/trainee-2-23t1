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
const provider_1 = require("../utils/provider");
const zod_1 = require("zod");
const provider_2 = require("../utils/provider");
const server_1 = require("@trpc/server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const signToken = (usrId) => jsonwebtoken_1.default.sign({ userId: usrId }, config_1.JwtSecret, { algorithm: "HS256" });
const checkInput = (input) => {
    if (Object.values(input).filter(s => s === '').length != 0) {
        throw new server_1.TRPCError({
            code: "BAD_REQUEST",
            message: "Input fields cannot be empty",
        });
    }
};
const loginEndpoint = provider_1.trpc.procedure.input(zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
})).output(zod_1.z.object({
    token: zod_1.z.string(),
})).mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
    checkInput(input);
    const usr = yield provider_2.prisma.user.findFirst({
        where: {
            email: input.email,
            password: input.password
        }
    }).catch(() => {
        throw new server_1.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Something went wrong in the server",
        });
    });
    if (typeof usr === 'undefined' || usr == null) {
        throw new server_1.TRPCError({
            code: 'NOT_FOUND',
            message: "Email or password not found",
        });
    }
    else {
        return { token: signToken(usr.id) };
    }
}));
const registerEndpoint = provider_1.trpc.procedure.input(zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string(),
    password: zod_1.z.string()
})).output(zod_1.z.object({
    token: zod_1.z.string(),
})).mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
    checkInput(input);
    const hasEmail = yield provider_2.prisma.user.findUnique({
        where: {
            email: input.email,
        }
    });
    if (hasEmail) {
        throw new server_1.TRPCError({
            code: "CONFLICT",
            message: 'Email already used',
        });
    }
    const calendar = yield provider_2.prisma.calendar.create({
        data: {
            availabilities: []
        }
    }).catch(() => {
        throw new server_1.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Something went wrong in the server",
        });
    });
    const usr = yield provider_2.prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: input.password,
            aboutMe: "Wave wave 🌊. Learning the ways of tides rn tbh.",
            calendarId: calendar.id,
            friends: []
        }
    }).catch(() => {
        throw new server_1.TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: "Something went wrong in the server",
        });
    });
    return { token: signToken(usr.id) };
}));
const authRouter = provider_1.trpc.router({
    login: loginEndpoint,
    register: registerEndpoint,
});
exports.default = authRouter;
