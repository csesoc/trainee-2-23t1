import authRouter from "../service/auth"
import calendarRouter from "../service/calendar"
import followRouter from "../service/follow"
import helloRouter from "../service/hello"
import searchRouter from "../service/search"
import tideRouter from "../service/tide"
import userRouter from "../service/user"
import { trpc } from "./provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
  calendar: calendarRouter,
  user: userRouter,
  search: searchRouter,
  follow: followRouter,
  tide: tideRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
