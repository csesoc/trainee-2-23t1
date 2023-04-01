import { protectedProcedure, trpc } from "../utils/provider"

const helloRouter = trpc.router({
  helloWorld: protectedProcedure.query(({ ctx }) => {
    return `Hello World, id is ${ctx.userId}`
  })
})

export default helloRouter
