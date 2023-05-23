import { TRPCError } from "@trpc/server";
import { prisma, trpc } from "../utils/provider";
import { z } from "zod";


const timeslotObject = z.object({
  startTime: z.date(),
  endTime: z.date(),
  details: z.string()
})

const calendarObject = z.object({
  id: z.string(),
  avaliabilities: z.array(timeslotObject),
  hasUser: z.array(z.string()),
  userId: z.string()
})

const createCalendar = trpc.procedure.input(
  z.object({
    userId: z.string()
  })
).output(
  z.object({id: z.string()})
).mutation(async ({ input }) => {
  const calendar = await prisma.calender.create({
    data: {userId: input.userId,}
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Something went wrong in the server",
    })
  })

  return {id: calendar.id}
})


const addTimeslot = trpc.procedure.input(
  z.object({
    calendarId: z.string(),
    timeslot: timeslotObject
  })
).output(
  z.number()
).mutation(async ({ input }) => {

  const calendar = await prisma.calender.findUniqueOrThrow({
    where: {
      id: input.calendarId,
    }
  }).catch(() => {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No calendar with matching id"
    })
  })

  if (calendar) {
    const c = await prisma.calender.update({
      where: {id: input.calendarId},
      data: {
        availabilities: {
          push: input.timeslot
        }
      }
    })
    c
    return 0;
  }

  // Should never be reached
  return -1
})

// const getWaveCalendar = trpc.procedure.input(
//   z.object({
//       id: z.string()
//   })
// ).output(
//   z.object
// )

const calendarRouter = trpc.router({
  createCalendar: createCalendar,
  addTimeslot: addTimeslot,
})

export default calendarRouter