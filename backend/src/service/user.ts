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

const updateUserProfile = trpc.procedure.input(
  z.object({
    token: z.string(),
    name: z.string(),
    degree: z.string(),
    phone: z.string(),
    aboutMe: z.string(),
    status: z.string(),
    dob: z.string(),
  })
).mutation(async ({ input, ctx }) => {
  checkInput(input);
  const userId = ctx.userId;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId as string
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Server error - something went wrong please try again.",
    })
  })

  if (user === null || typeof user === undefined) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "User does not exist",
    })
  }

  await prisma.user.update({
    where: {
      id: userId as string
    },
    data: {
      name: input.name,
      degree: input.degree,
      phone: input.phone,
      aboutMe: input.aboutMe,
      status: input.status,
      dob: input.dob,
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Failed to update user profile",
    })
  })
  
  return {
    success: true,
    message: "Profile updated successfully"
  }
})


const updateUserPassword = trpc.procedure.input(
  z.object({
    token: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string()
  })
).mutation(async ({ input, ctx }) => {
  checkInput(input);
  const userId = ctx.userId;
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId as string
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Server error - something went wrong please try again.",
    })
  })
  
  if (user === null || typeof user === undefined) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "User does not exist",
    })
  }
  
  if (input.newPassword !== input.confirmPassword) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: "Passwords do not match",
    })
  }
  
  // if new password is same as old password
  if (input.newPassword === user.password) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: "New password cannot be the same as old password",
    })
  }

  await prisma.user.update({
    where: {
      id: userId as string
    },
    data: {
      password: input.newPassword
    }
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Failed to update user password",
    })
  })
  
  return {
    success: true,
    message: "Password updated successfully"
  }
})

const getUserProfile = trpc.procedure.input(
  z.object({
    token: z.string()
  })
).query(async ({ input, ctx }) => {
  checkInput(input);
  const userId: any = ctx.userId;

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
    calendarId: usr.calendarId,
    dob: usr.dob,
    degree: usr.degree,
    phone: usr.phone,
    aboutMe: usr.aboutMe,
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
  updateUserProfile: updateUserProfile,
  updateUserPassword: updateUserPassword,
  getUserProfile: getUserProfile,
  statusChange: updateStatusEndpoint,
})

export default userRouter