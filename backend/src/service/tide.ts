import { z } from "zod";
import { prisma, protectedProcedure, trpc } from "../utils/provider";
import { TRPCError } from "@trpc/server";

const submitEndpoint = protectedProcedure.input(
  z.object({
    tideTitle: z.string(),
    proposedTime: z.string().datetime(),
    endTime: z.string().datetime(),
    location: z.string(),
    repeatType: z.enum(["NONE", "DAILY", "WEEKLY", "MONTHLY"]),
    containUsers: z.string().array(),
  })
).mutation(async ({ input }) => {
  console.log(input)
  await prisma.wave.create({
    data: {
      tideTitle: input.tideTitle,
      proposedTime: input.proposedTime,
      endTime: input.endTime,
      createdById: input.containUsers[0],
      invitedUsersId: input.containUsers,
      location: input.location,
      repeatType: input.repeatType,
    }
  }).catch((e) => {
    console.log(e)
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong in the DB",
      cause: e.meta.message,
    })
  })
})

const tideRouter = trpc.router({
  submit: submitEndpoint,
})

export default tideRouter
