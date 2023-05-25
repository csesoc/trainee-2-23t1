import authRouter from "../service/auth"
import helloRouter from "../service/hello"
import userRouter from "../service/user"
import { trpc } from "./provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
  user: userRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
