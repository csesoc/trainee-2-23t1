import authRouter from "./service/auth"
import helloRouter from "./service/hello"
import { trpc } from "./trpc_provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
