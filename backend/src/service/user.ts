import { TRPCError } from "@trpc/server";
import { prisma, protectedProcedure, trpc } from "../utils/provider";
import { string, z } from "zod";

const checkInput = (input: Object) => {
  if (Object.values(input).filter(s => s === '').length != 0) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Input fields cannot be empty",
    })
  }
}

const getUserProfile = trpc.procedure.input(
  z.object({
    token: z.string()
  })
).query(async ({ input, ctx }) => {
  checkInput(input);
  const userId = ctx.userId;

  const usr = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId as string
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Server error - something went wrong please try again.",
    })
  })

  if (usr === null || typeof usr === undefined) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "User does not exist",
    })
  }

  return {
    name: usr.name,
    email: usr.email,
    status: usr.status,
    calendarId: usr.calendarId
  }
})

const updateStatusEndpoint = trpc.procedure.input(
  z.object({
    token: z.string(),
    status: z.string()
  })
).mutation(async ({ input, ctx }) => {
  checkInput(input);
  const userId = ctx.userId;

  const usr = await prisma.user.update({
    where: {
      id: userId as string
    },
    data: {
      status: input.status
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Failed to update user status",
    })
  })

  return {status: usr.status}
})

const acceptTide = protectedProcedure.input(
  z.object({
    tideId: z.string(),
  })
).mutation(async ({ input, ctx }) => {
  const invitedUsers = await prisma.wave.findUniqueOrThrow({
    where: {
      id: input.tideId,
    },
    select: {
      invitedUsersId: true
    }
  }).catch((e) => {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Unable to find tide'
    })
  })

  await prisma.wave.update({
    where: {
      id: input.tideId,
    },
    data: {
      invitedUsersId: invitedUsers.invitedUsersId.filter(i => i !== ctx.userId),
      hasUsersId: {
        push: ctx.userId,
      }
    }
  })
})

const userRouter = trpc.router({
  getUserProfile: getUserProfile,
  statusChange: updateStatusEndpoint,
  acceptTide: acceptTide,
})

export default userRouter