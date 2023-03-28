import { trpc } from "../trpc_provider"

const helloRouter = trpc.router({
  helloWorld: trpc.procedure.query(() => {
    return "Hello World"
  })
})

export default helloRouter
