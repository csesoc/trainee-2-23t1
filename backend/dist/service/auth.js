"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_provider_1 = require("../trpc_provider");
const zod_1 = require("zod");
const loginEndpoint = trpc_provider_1.trpc.procedure.input(zod_1.z.object({
    username: zod_1.z.string(),
    userid: zod_1.z.number().int(),
}))
    .mutation(({ input }) => {
    return `Hello ${input.username} with id ${input.userid}`;
});
const authRouter = trpc_provider_1.trpc.router({
    login: loginEndpoint,
});
exports.default = authRouter;
