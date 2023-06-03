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
).mutation(async ({ input, ctx }) => {
  console.log(input)

  const zodDate = z.string().datetime()
  if (zodDate.parse(input.proposedTime) > zodDate.parse(input.endTime)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "End time cannot be earlier than start time",
    })
  }
  await prisma.wave.create({
    data: {
      tideTitle: input.tideTitle,
      proposedTime: input.proposedTime,
      endTime: input.endTime,
      createdById: ctx.userId,
      hasUsersId: [ctx.userId],
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
