import express, { Express } from "express"
import cors from "cors"
import * as trpcAdapter from "@trpc/server/adapters/express"
import appRouter from "./router"

const app: Express = express()

app.use(cors({ origin: "http://localhost:5173" }))

app.use('/trpc', trpcAdapter.createExpressMiddleware({
  router: appRouter
}))

app.listen(8000, () => {
  console.log(`* Server is listening on port 8000`)
});
