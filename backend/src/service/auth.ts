import { trpc } from "../trpc_provider";
import { z } from "zod"

const loginEndpoint = trpc.procedure.input(
    z.object({
      username: z.string(),
      userid: z.number().int(),
    })
  )
  .mutation(({ input }) => {
    return `Hello ${input.username} with id ${input.userid}`
  })

const authRouter = trpc.router({
  login: loginEndpoint,
})

export default authRouter
