import { TRPCError } from "@trpc/server";
import { prisma, trpc } from "../utils/provider";
import { z } from "zod";

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


const userRouter = trpc.router({
  getUserProfile: getUserProfile,
  statusChange: updateStatusEndpoint,
})

export default userRouter