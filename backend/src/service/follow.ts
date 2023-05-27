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

const makeFollows = trpc.procedure.input(
  z.object({
    token: z.string(),
    usrEmail: z.string()
  })
).mutation(async ({ input, ctx }) => {
  checkInput(input);
  const userId = ctx.userId;

  // Current user is to be valid
  if (userId === null || typeof userId === undefined) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: 'Current user does not exist',
    })
  }

  const targetUser = await prisma.user.findUnique({
    where: {
      email: input.usrEmail
    }
  })
  const curUser = await prisma.user.findUnique({
    where: {
      email: input.usrEmail
    }
  })

  let usrSrc: User, usrTarget: User;

  // Target user is to exist in database
  if (targetUser === null || typeof targetUser === undefined) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: 'Target user does not exist',
    })
  } else if (curUser === null || typeof curUser === undefined) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: 'Current user does not exist',
    })
  } else if (targetUser.friends.includes(userId as string)) {
    // this means we are unfollowing
    const curUsrIndex = targetUser.friends.indexOf(userId)
    if (curUsrIndex !== -1) {
      targetUser.friends.splice(curUsrIndex, 1)
    }
    
    const targetUsrIndex = curUser.friends.indexOf(targetUser.id)
    if (targetUsrIndex !== -1) {
      curUser.friends.splice(targetUsrIndex, 1)
    }

    usrSrc = await prisma.user.update({
      where: {
        id: targetUser.id as string
      },
      data: {
        friends: curUser.friends
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Target user does not exist - something went wrong.",
      })
    })
    usrTarget = await prisma.user.update({
      where: {
        id: targetUser.id as string
      },
      data: {
        friends: targetUser.friends
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Target user does not exist - something went wrong.",
      })
    })

  } else {

    // Add current user to target user follow list & vice versa
    usrSrc = await prisma.user.update({
      where: {
        id: userId as string
      },
      data: {
        friends: {
          push: targetUser.id
        }
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Current user does not exist - something went wrong.",
      })
    })

    usrTarget = await prisma.user.update({
      where: {
        id: targetUser.id as string
      },
      data: {
        friends: {
          push: userId as string
        }
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Target user does not exist - something went wrong.",
      })
    })
  }

  return {
    following: usrSrc.friends.includes(targetUser.id)
  }
})

const followRouter = trpc.router({
  follow: makeFollows,
})

export default followRouter