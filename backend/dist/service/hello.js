"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_provider_1 = require("../trpc_provider");
const helloRouter = trpc_provider_1.trpc.router({
    helloWorld: trpc_provider_1.trpc.procedure.query(() => {
        return "Hello World";
    })
});
exports.default = helloRouter;
