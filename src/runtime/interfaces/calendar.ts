import type { EventActions } from '~/src/runtime/enums/calendar'

export interface DayOfWeek {
  id: number
  title: string
  abbr: string
}
export interface Current {
  month: string
  year: number
  day: string
}
export interface Month {
  id: number
  name: string
  start: string
  end: string
}

export interface Days {
  date: string
  dateEn: string
  dayOfWeek: string
  day: number
  index: number
  events: DayEvent[]
}

export interface DayEvent {
  id: number
  title: string
  color: string
  time: string
  date: string
  extra?: any | null
  action: EventActions
}
