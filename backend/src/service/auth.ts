import { trpc } from "../utils/provider";
import { z } from "zod"
import { prisma } from "../utils/provider";
import { TRPCError } from "@trpc/server";
import jwt from 'jsonwebtoken'
import { JwtSecret } from "../../config";

const signToken = (usrId: string) => jwt.sign({userId: usrId}, JwtSecret, {algorithm: "HS256"})

const loginEndpoint = trpc.procedure.input(
  z.object({
    email: z.string(),
    password: z.string(),
  })
).output(
  z.object({
    token: z.string(),
  })
).mutation(async ({ input }) => {
  const usr = await prisma.user.findFirst({
    where: {
      email: input.email,
      password: input.password
    }
  })

  if (typeof usr === 'undefined' || usr == null) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: "Email or password not found",
    })
  } else {
    return {token: signToken(usr.id)}
  }
})

const registerEndpoint = trpc.procedure.input(
  z.object({
    name: z.string(),
    email: z.string(),
    password: z.string()
  })
).output(
  z.object({
    token: z.string(),
  })
).mutation(async ({ input }) => {
  const usr = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password: input.password,
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Something went wrong in the server",
    })
  })

  return {token: signToken(usr.id)}
})

const authRouter = trpc.router({
  login: loginEndpoint,
  register: registerEndpoint,
})

export default authRouter
