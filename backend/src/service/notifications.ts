import { z } from "zod";
import { prisma, protectedProcedure, trpc } from "../utils/provider";

const getNotif = protectedProcedure.output(
  z.object({
    id: z.string(),
    createdBy: z.string(),
    tideTitle: z.string(),
  }).array()
).query(async ({ ctx }) => {
  const invited = await prisma.wave.findMany({
    where: {
      invitedUsersId: {
        has: ctx.userId
      }
    },
    select: {
      id: true,
      createdBy: {
        select: {
          name: true
        }
      },
      tideTitle: true
    }
  })

  return invited.map(i => {
    return {
      id: i.id,
      createdBy: i.createdBy.name, 
      tideTitle: i.tideTitle,
    }
  })
})

const notifRouter = trpc.router({
  getNotif,
})

export default notifRouter
