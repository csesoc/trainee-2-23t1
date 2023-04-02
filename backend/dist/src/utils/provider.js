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
exports.protectedProcedure = exports.prisma = exports.trpc = void 0;
// Prevents circular imports
const server_1 = require("@trpc/server");
const client_1 = require("@prisma/client");
const trpc = server_1.initTRPC.context().create();
exports.trpc = trpc;
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const protectedProcedure = trpc.procedure.use(trpc.middleware(({ ctx, next }) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.userId == null || typeof ctx.userId === 'undefined') {
        throw new server_1.TRPCError({
            code: 'FORBIDDEN',
            message: 'No token found',
        });
    }
    return next({
        ctx: {
            userId: ctx.userId,
        }
    });
})));
exports.protectedProcedure = protectedProcedure;
