import moment from 'moment-jalaali'
import fa from 'moment/src/locale/fa'
import type { Current, Days, Month } from '~/src/runtime/interfaces/calendar'

moment.locale('fa', fa)
moment.loadPersian()

export const convertToJalali = (dt: string) => {
  const date = moment(dt)
  return date.format('jYYYY/jMM/jDD')
}

export const getCurrentMonthAndYear = (): Current => {
  const date = moment(new Date().toString())
  return {
    day: date.format('jDD'),
    month: date.format('jMMMM'),
    year: date.format('jYYYY'),
  }
}
export const getMonthsOfYear = (year: string): Month[] => {
  const months: Month[] = []
  for (let month = 1; month <= 12; month++) {
    const start = moment(`${year}/${month}/01`, 'jYYYY/jM/jD')
    const end = start.clone().endOf('jMonth')
    months.push({
      id: month,
      name: start.format('jMMMM'),
      start: start.format('jYYYY/jMM/jDD'),
      end: end.format('jYYYY/jMM/jDD'),
    })
  }
  return months
}
export const getDaysBetweenDates = (startDate: string, endDate: string): Days[] => {
  const weekDays = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'آدینه']
  const start = moment(startDate, 'jYYYY/jMM/jDD')
  const end = moment(endDate, 'jYYYY/jMM/jDD')
  const daysArray: Days[] = []

  let index = -1

  while (start.isSameOrBefore(end)) {
    const dayOfWeek = start.format('dddd')

    if (index == -1) {
      index = weekDays.indexOf(dayOfWeek) // محاسبه ایندکس بر اساس آرایه weekDays;
    }

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
