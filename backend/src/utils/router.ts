import authRouter from "../service/auth"
import followRouter from "../service/follow"
import helloRouter from "../service/hello"
import searchRouter from "../service/search"
import userRouter from "../service/user"
import { trpc } from "./provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
  user: userRouter,
  search: searchRouter,
  follow: followRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
