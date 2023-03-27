"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
// Prevents circular imports
const server_1 = require("@trpc/server");
exports.trpc = server_1.initTRPC.create();
