import dayjs from 'dayjs'
import jalaliday from 'jalaliday'
import type { Current, Days, Month } from '~/src/runtime/interfaces/calendar'

dayjs.extend(jalaliday)

// تنظیم منطقه زمانی به شمسی
const jDayjs = (date?: string | Date) =>
  dayjs(date).calendar('jalali').locale('fa')

enum MonthAction {
  Now = 'now',
  Next = 'next',
  Prev = 'prev',
  Jump = 'jump',
}

// تبدیل تاریخ میلادی به جلالی
export const convertToJalali = (dt: string) =>
  jDayjs(dt).format('YYYY/MM/DD')

// گرفتن ماه و سال جاری، ماه بعد، ماه قبل و ماه دلخواه
export const getCurrentMonthAndYear = (
  year?: number,
  month?: string,
  action: MonthAction = MonthAction.Now
): Current => {
  let date = jDayjs()

  if (action === MonthAction.Jump) {
    date = jDayjs(`${year}/${month}/01`)
  } else if (action === MonthAction.Next) {
    date = date.add(1, 'month')
  } else if (action === MonthAction.Prev) {
    date = date.subtract(1, 'month')
  }

  return {
    day: date.format('DD'),
    month: date.format('MMMM'),
    year: date.format('YYYY'),
  }
}

// دریافت تمامی ماه‌ها در یک سال مشخص
export const getMonthsOfYear = (year: string): Month[] =>
  Array.from({ length: 12 }, (_, month) => {
    const start = jDayjs(`${year}/${month + 1}/01`)
    return {
      id: month + 1,
      name: start.format('MMMM'),
      start: start.format('YYYY/MM/DD'),
      end: start.endOf('month').format('YYYY/MM/DD'),
      startEn: start.calendar('gregory').format('YYYY/MM/DD'),
      endEn: start.endOf('month').calendar('gregory').format('YYYY/MM/DD'),
    }
  })

// دریافت تمامی روزها بین دو تاریخ مشخص
export const getDaysBetweenDates = (
  startDate: string,
  endDate: string
): Days[] => {
  const start = jDayjs(startDate)
  const end = jDayjs(endDate)
  const weekDays = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'آدینه']

  const daysArray: Days[] = []
  let index = -1

  while (start.isSameOrBefore(end)) {
    const dayOfWeek = start.format('dddd')
    if (index === -1) index = weekDays.indexOf(dayOfWeek)

    daysArray.push({
      date: start.format('YYYY/MM/DD'),
      dateEn: start.calendar('gregory').format('YYYY/MM/DD'),
      day: +start.format('D'),
      dayOfWeek,
      index,
      events: [],
    })

    start.add(1, 'day')
    index++
  }

  return daysArray
}
