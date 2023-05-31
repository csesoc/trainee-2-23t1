import { TRPCError } from "@trpc/server";
import { prisma, trpc } from "../utils/provider";
import { z } from "zod";
import { endOfWeek, getDay, getDaysInMonth, getHours, isSameDay, isSameWeek, startOfWeek } from 'date-fns'
import { time } from "console";

interface Timeslot {
  startTime: Date,
  endTime: Date,
  details?: string
}
enum CellColour {
  GREY,
  LIGHT_GREEN,
  GREEN,
  ORANGE,
  RED,
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
    if (timeslotCollision(input.timeslot, calendar.availabilities)) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Timeslot overlaps with existing event"
      })
    }
    const c = await prisma.calendar.update({
      where: { id: input.calendarId },
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

const createDataStructure = () => {
  const arr = new Array(7)
  for (let i = 0; i < 7; i++) {
    const hours = new Array(24)
    for (let j = 0; j < 24; j++) {
      hours[j] = { colour: CellColour.LIGHT_GREEN, details: "", numUsers: 0 }
    }
    arr[i] = { hours: hours }
  }
  return arr
}

const computeColour = (unavaliable: number, total: number) => {
  const avaliable = total - unavaliable
  if (unavaliable === 0 && avaliable === 0) {
    return CellColour.GREY
  }
  if (avaliable === total) {
    return CellColour.GREEN
  }
  if (unavaliable === total) {
    return CellColour.RED
  }
  if (avaliable > unavaliable) {
    return CellColour.LIGHT_GREEN
  }
  return CellColour.ORANGE
}

const getCalendarEndpoint = trpc.procedure.input(
  z.object({
    id: z.string(),
    date: z.coerce.date()
  })).output(
    z.object({
      days: z.array(z.any()).max(7)
    })
  ).query(async ({ input }) => {
    const calendar = await prisma.calendar.findUniqueOrThrow({
      where: {
        id: input.id
      },
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong in the server",
      })
    })

    const days = createDataStructure()

    for (const timeslot of calendar.availabilities) {
      // Check if the timeslot lies between the start and end date
      if (timeslot.startTime >= startOfWeek(input.date) && endOfWeek(input.date) >= timeslot.endTime) {

        const start = { day: getDay(timeslot.startTime), hour: getHours(timeslot.startTime) }
        const end = { day: getDay(timeslot.endTime), hour: getHours(timeslot.endTime) }

        let currCellNum = (start.day * 24) + start.hour
        const endCellNum = (end.day * 24) + end.hour

        while (currCellNum <= endCellNum) {
          const day = Math.floor(currCellNum / 24)
          const currHour = currCellNum % 24

          days[day].hours[currHour].colour = CellColour.GREY
          days[day].hours[currHour].details = timeslot.details
          currCellNum += 1
        }
      }
    }

    return { days: days }
  })


const getManyCalendar = async (userIds: string[], date: Date) => {
  const days = createDataStructure()

  for (const userId of userIds) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: {
        calendar: true,
      }
    }).catch(() => {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "Something went wrong in the server",
      })
    })

    for (const timeslot of user.calendar.availabilities) {

      // Check if the timeslot lies between the start and end date
      if (timeslot.startTime >= startOfWeek(date) && endOfWeek(date) >= timeslot.endTime) {

        const start = { day: getDay(timeslot.startTime), hour: getHours(timeslot.startTime) }
        const end = { day: getDay(timeslot.endTime), hour: getHours(timeslot.endTime) }

        let currCellNum = (start.day * 24) + start.hour
        const endCellNum = (end.day * 24) + end.hour

        while (currCellNum <= endCellNum) {
          const day = Math.floor(currCellNum / 24)
          const currHour = currCellNum % 24

          days[day].hours[currHour].numUsers += 1
          currCellNum += 1
        }
      }
    }

    for (const day of days) {
      for (const hour of day.hours) {
        hour.colour = computeColour(hour.numUsers, userIds.length)
        hour.details = `${userIds.length - hour.numUsers}/${userIds.length}`
      }
    }
  }
  return { days: days }
}

const getSharedCalendarEndpoint = trpc.procedure.input(
  z.object({
    userIds: z.array(z.string()),
    date: z.coerce.date(),
  })
).output(
  z.object({
    days: z.array(z.any()).max(7)
  })
).query(async ({ input }) => {

  return getManyCalendar(input.userIds, input.date)
})

const getWaveCalendarEndpoint = trpc.procedure.input(
  z.object({
    id: z.string(),
    date: z.coerce.date(),
  })
).output(
  z.object({
    days: z.array(z.any()).max(7)
  })
).query(async ({ input }) => {
  const wave = await prisma.wave.findUniqueOrThrow({
    where: { id: input.id }
  }).catch((e) => {
    console.log(e)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: "No Wave corresponding to the ID was found",
    })
  })

  return getManyCalendar(wave.hasUsersId, input.date)
  
})

const calendarRouter = trpc.router({
  addTimeslot: addTimeslotEndpoint,
  getCalendar: getCalendarEndpoint,
  getSharedCalendar: getSharedCalendarEndpoint,
  getWaveCalendar: getWaveCalendarEndpoint
})

export default calendarRouter