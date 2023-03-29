import { trpc } from "../trpc_provider";
import { z } from "zod"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const loginEndpoint = trpc.procedure.input(
    z.object({
      username: z.string(),
      userid: z.number().int(),
    })
  )
  .mutation(async ({ input }) => {
    const usr = await prisma.user.create({
      data: {
        name: input.username,
        email: "email@email.com",
        password: "password"
      }
    })

    return `Hello ${usr.name} with id ${usr.id}`
  })

const authRouter = trpc.router({
  login: loginEndpoint,
})

export default authRouter
