import { protectedProcedure, trpc } from "../utils/provider"

const helloRouter = trpc.router({
  helloWorld: protectedProcedure.query(({ ctx }) => {
    return ctx.userId
  })
})

export default helloRouter
