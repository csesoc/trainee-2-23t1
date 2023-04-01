import express, { Express } from "express"
import cors from "cors"
import * as trpcAdapter from "@trpc/server/adapters/express"
import appRouter from "./src/utils/router"
import { CreateExpressContextOptions } from "@trpc/server/adapters/express"
import { inferAsyncReturnType } from "@trpc/server"
import jwt, { JwtPayload } from "jsonwebtoken"
import { JwtSecret } from "./config"

const app: Express = express()

const createContext = ({req, res}: CreateExpressContextOptions) => {
  if (!req.headers?.authorization) {
    return {userId: null}
  }
  const token = req.headers.authorization.split(" ")[1];
  const payload:any = jwt.verify(token, JwtSecret) // lazy
  return { userId: payload.userId }
}

app.use(cors({ origin: "http://localhost:5173" }))
app.use('/trpc', trpcAdapter.createExpressMiddleware({
  router: appRouter,
  createContext
}))

app.listen(8000, () => {
  console.log(`* Server is listening on port 8000`)
});

export type Context = inferAsyncReturnType<typeof createContext>
