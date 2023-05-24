import authRouter from "../service/auth"
import calendarRouter from "../service/calendar"
import helloRouter from "../service/hello"
import { trpc } from "./provider"

const appRouter = trpc.router({
  hello: helloRouter,
  auth: authRouter,
  calendar: calendarRouter,
})

export default appRouter
export type AppRouter = typeof appRouter
