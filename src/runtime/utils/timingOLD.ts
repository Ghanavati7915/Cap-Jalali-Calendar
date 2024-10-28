import * as moment from 'moment-jalaali'
moment.locale('fa') // تنظیم زبان فارسی
moment.loadPersian({ dialect: 'persian-modern' }) // فارسی‌سازی مدرن


import type { Current, Days, Month } from '~/src/runtime/interfaces/calendar'

enum MonthAction {
  Now = 'now',
  Next = 'next',
  Prev = 'prev',
  Jump = 'jump',
}

export const convertToJalali = (dt: string) => moment(dt).format('jYYYY/jMM/jDD')
export const getCurrentMonthAndYear = (year?: number, month?: string, action: MonthAction = MonthAction.Now): Current => {
  let date

  if (action === MonthAction.Now) {
    date = moment()
  }
  else if (action === MonthAction.Jump) {
    date = moment(`${year}/${month}/01`, 'jYYYY/jMMMM/jDD')
  }
  else {
    date = moment(`${year}/${month}/01`, 'jYYYY/jMMMM/jDD')
    if (action === MonthAction.Next) {
      date.add(1, 'month')
    }
    else if (action === MonthAction.Prev) {
      date.subtract(1, 'month')
    }
  }

  return { day: date.format('jDD'), month: date.format('jMMMM'), year: date.format('jYYYY') }
}

export const getMonthsOfYear = (year: string): Month[] =>
  Array.from({ length: 12 }, (_, month) => {
    const start = moment(`${year}/${month + 1}/01`, 'jYYYY/jM/jD')
    return {
      id: month + 1,
      name: start.format('jMMMM'),
      start: start.format('jYYYY/jMM/jDD'),
      end: start.clone().endOf('jMonth').format('jYYYY/jMM/jDD'),
      startEn: start.format('YYYY/MM/DD'),
      endEn: start.clone().endOf('jMonth').format('YYYY/MM/DD'),
    }
  })

export const getDaysBetweenDates = (startDate: string, endDate: string): Days[] => {
  const start = moment(startDate, 'jYYYY/jMM/jDD')
  const end = moment(endDate, 'jYYYY/jMM/jDD')
  const weekDays = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'آدینه']

  const daysArray: Days[] = []
  let index = -1

  while (start.isSameOrBefore(end)) {
    const dayOfWeek = start.format('dddd')
    if (index === -1) index = weekDays.indexOf(dayOfWeek)

    daysArray.push({
      date: start.format('jYYYY/jMM/jDD'),
      dateEn: start.format('YYYY/MM/DD'),
      day: +start.format('jD'),
      dayOfWeek,
      index,
      events: [],
    })

    start.add(1, 'day')
    index++
  }

  return daysArray
}
