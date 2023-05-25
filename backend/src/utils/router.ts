import authRouter from "../service/auth"
import helloRouter from "../service/hello"
import searchRouter from "../service/search"
import userRouter from "../service/user"
import { trpc } from "./provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
  user: userRouter,
  search: searchRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
