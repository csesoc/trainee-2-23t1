// Prevents circular imports
import { initTRPC, TRPCError } from "@trpc/server"
import { PrismaClient } from "@prisma/client"
import { Context } from "../../server"

const trpc = initTRPC.context<Context>().create()
const prisma = new PrismaClient()

const protectedProcedure = trpc.procedure.use(trpc.middleware(async ({ctx, next}) => {
  if (ctx.userId == null || typeof ctx.userId === 'undefined') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'No token found',
    })
  }

  return next({
    ctx: {
      userId: ctx.userId,
    }
  })
}))

export { trpc, prisma, protectedProcedure }
