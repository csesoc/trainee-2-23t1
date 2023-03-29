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
const trpc_provider_1 = require("../trpc_provider");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginEndpoint = trpc_provider_1.trpc.procedure.input(zod_1.z.object({
    username: zod_1.z.string(),
    userid: zod_1.z.number().int(),
}))
    .mutation(({ input }) => __awaiter(void 0, void 0, void 0, function* () {
    const usr = yield prisma.user.create({
        data: {
<<<<<<< HEAD
            name: input.username
=======
            name: input.username,
            email: "email@email.com",
            password: "password"
>>>>>>> origin
        }
    });
    return `Hello ${usr.name} with id ${usr.id}`;
}));
const authRouter = trpc_provider_1.trpc.router({
    login: loginEndpoint,
});
exports.default = authRouter;
