import { TRPCError } from "@trpc/server";
import { prisma, trpc } from "../utils/provider";
import { z } from "zod";
import { getDay, getHours, isSameDay, isSameWeek } from 'date-fns'

interface Timeslot {
  startTime: Date,
  endTime: Date,
  details?: string
}

const timeslotCollision = (t: Timeslot, avaliabilities: Timeslot[]) => {
  let found = false
  avaliabilities.forEach(timeslot => {
    if (t.startTime >= timeslot.startTime && t.startTime <= timeslot.endTime) {
      found = true
    }
    if (t.endTime >= timeslot.startTime && t.endTime <= timeslot.endTime) {
      found = true
    }
  });
  return found
}

const timeslotObject = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  details: z.string()
})

const calendarObject = z.object({
  id: z.string(),
  avaliabilities: z.array(timeslotObject),
  hasUser: z.array(z.string()),
  userId: z.string()
})

const addTimeslotEndpoint = trpc.procedure.input(
  z.object({
    calendarId: z.string(),
    timeslot: timeslotObject
  })
).output(
  z.number()
).mutation(async ({ input }) => {

  const calendar = await prisma.calendar.findUniqueOrThrow({
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
    if (!isSameDay(input.timeslot.startTime, input.timeslot.endTime)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Timeslot must be on the same day"
      })
    }
    if (timeslotCollision(input.timeslot, calendar.availabilities)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Timeslot overlaps with existing event"
      })
    }
    const c = await prisma.calendar.update({
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

const getWaveCalendar = trpc.procedure.input(
  z.object({
      id: z.string(),
      startDate: z.date(),
      endDate: z.date(),
  })
).output(
  z.object({
    days: z.array(z.array(z.number().max(24))).max(7),
    numUsers: z.number()
  })
).query(async ({ input }) => {
  const wave = await prisma.wave.findUniqueOrThrow({
    where: {id: input.id}
  }).catch(() => {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "Something went wrong in the server",
    })
  })

  const hours = Array(24).fill(0)
  const days = Array(7).fill(hours)

  for (const userId of wave.hasUsersId) {
    const user = await prisma.user.findUniqueOrThrow({
      where: {id: userId},
      include: {
        calendar: true,
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong in the server",
      })
    })

    //Assumes that no two timeslots can overlap
    user.calendar.availabilities.forEach(timeslot => {
      // We only worry about timeslots in the same week as the currently displayed
      // week
      if (isSameWeek(input.startDate, timeslot.startTime)) {
        const currHour = getHours(timeslot.startTime)
        const endHour = getHours(timeslot.endTime)
        const day = getDay(timeslot.startTime)
        while (currHour < endHour) {
          days[day][currHour] += 1
        }
      }
    })
  }
  return {days: days, numUsers: wave.hasUsersId.length}
})

const calendarRouter = trpc.router({
  addTimeslot: addTimeslotEndpoint,
  getWaveCalendar: getWaveCalendar
})

export default calendarRouter