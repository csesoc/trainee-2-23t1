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
      hours[j] = {colour: CellColour.LIGHT_GREEN, details: "", numUsers: 0}
    }
    arr[i] = {hours: hours}
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
  ).query(async ({input}) => {
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
      if (timeslot.startTime >= startOfWeek(input.date) && endOfWeek(input.date) >= timeslot.endTime) {
        let currHour = getHours(timeslot.startTime)
        const endHour = getHours(timeslot.endTime)
        const day = getDay(timeslot.startTime)
        while (currHour <= endHour) {
          days[day].hours[currHour].colour = CellColour.GREY
          days[day].hours[currHour].details = timeslot.details
          currHour += 1
        }
      }
    }

    return {days: days}
  })

const getWaveCalendar = trpc.procedure.input(
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

  const days = createDataStructure()

  for (const userId of wave.hasUsersId) {
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
      if (timeslot.startTime >= startOfWeek(input.date) && endOfWeek(input.date) >= timeslot.endTime) {
        let currHour = getHours(timeslot.startTime)
        const endHour = getHours(timeslot.endTime)
        const day = getDay(timeslot.startTime)
        while (currHour <= endHour) {
          days[day].hours[currHour].numUsers += 1
          currHour += 1
        }
      }
    }
  }

  const numUsers = wave.hasUsersId.length
  console.log("Here")
  for (const day of days) {
    for (const hour of day.hours) {
      hour.colour = computeColour(hour.numUsers, wave.hasUsersId.length)
      hour.details = `${wave.hasUsersId.length - hour.numUsers}/${wave.hasUsersId.length}`
    }
  }
  return {days: days}
})

const calendarRouter = trpc.router({
  addTimeslot: addTimeslotEndpoint,
  getCalendar: getCalendarEndpoint,
  getWaveCalendar: getWaveCalendar
})

export default calendarRouter