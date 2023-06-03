"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provider_1 = require("../utils/provider");
const helloRouter = provider_1.trpc.router({
    helloWorld: provider_1.protectedProcedure.query(({ ctx }) => {
        return ctx.userId;
    })
});
exports.default = helloRouter;
