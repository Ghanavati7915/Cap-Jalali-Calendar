<script setup lang="ts">
// #region Import
import { convertToJalali, getCurrentMonthAndYear, getDaysBetweenDates, getMonthsOfYear } from '../utils/timing'
import type {
  Current,
  DayOfWeek,
  Days,
  Month,
  DayEvent,
} from '~/src/runtime/interfaces/calendar'
// #endregion

// #region Props & Emit
const emit = defineEmits(['onEvent'])
const props = defineProps({
  events: {
    type: Array<DayEvent>,
    required: false,
  },
})
// #endregion

// #region Variables
const loading = ref<boolean>(true)
const current = ref<Current>(null)
const selected = ref<Current>(null)
const months = ref<Month[]>([])
const days = ref<Days[]>([])
const calendarEvents = ref<DayEvent[]>([])
const daysOfWeek = ref<DayOfWeek[]>([
  { id: 0, abbr: 'ش', title: 'شنبه' },
  { id: 1, abbr: 'یک', title: 'یکشنبه' },
  { id: 2, abbr: 'دو', title: 'دوشنبه' },
  { id: 3, abbr: 'سه', title: 'سه شنبه' },
  { id: 4, abbr: 'چهار', title: 'چهارشنبه' },
  { id: 5, abbr: 'پنج', title: 'پنجشنبه' },
  { id: 6, abbr: 'جمعه', title: 'جمعه' },
])
// #endregion

// #region Functions
const fillCurrent = () => {
  current.value = getCurrentMonthAndYear()
  selected.value = current.value
  fillMonths()
}
const fillMonths = () => {
  months.value = getMonthsOfYear(selected.value.year)
  fillDays()
}
const fillDays = () => {
  const selectedRange = months.value.find((month: Month) => month.name == selected.value.month)
  days.value = getDaysBetweenDates(selectedRange.start, selectedRange.end)
  pushEvents()
  loading.value = false
}
const getDay = (index: number): Days => {
  return days.value.find((day: Days) => day.index == index)
}
const isToDay = (condidateDay: Days): boolean => {
  return (convertToJalali(new Date().toString()) == condidateDay.date)
}

const pushEvents = () => {
  // Clear all
  days.value.some((day: Days) => {
    day.events = []
  })
  // fill
  calendarEvents.value.forEach((ev: DayEvent) => {
    days.value.find((day: Days) => {
      if (day.date == ev.date) day.events.push(ev)
    })
  })
}
const onEvent = (data: any) => {
  emit('onEvent', data)
}
const getDaysOfCalendar = computed<number>(() => {
  const selectedRange = months.value.find((month: Month) => month.name == selected.value.month)
  if (selectedRange) {
    const startOfMonth = +days.value[0].day
    const endOfMonth = +days.value[days.value.length - 1].day
    const countDayOfMonth = +selectedRange?.end.split('/')[2]
    const Saturdays = days.value.filter((day: Days) => day.dayOfWeek == 'شنبه')
    const lastSaturDay = Saturdays[Saturdays.length - 1].day
    return (countDayOfMonth) + (startOfMonth) + (7 - ((endOfMonth - lastSaturDay) + 1))
  }
  else {
    return 31
  }
})
// #endregion

// #region Watch
watch(
  () => props.events,
  (data) => {
    calendarEvents.value = []
    data.forEach((event: DayEvent) => {
      calendarEvents.value.push(event)
    })
    pushEvents()
  }, { immediate: true, deep: true },
)

// #endregion

// #region Constructor
onMounted(async () => {
  fillCurrent()
})
// #endregion
</script>

<template>
  <div>
    <div v-if="loading" />
    <div v-if="!loading">
      <div class="flex flex-col">
        <span> YEAR : {{ current.year }} | MONTH : {{ current.month }} | DAY : {{ current.day }} </span>
        <p>-------------------------------------</p>
        <div class="text-sm color-danger-500">
          <p
            v-for="(item, i) in months"
            :key="`month_${i}`"
          >
            {{ item.name }} {{ item.start }} {{ item.end }}
          </p>
        </div>
        <p>-------------------------------------</p>
        <div class="text-sm color-danger-500">
          <p
            v-for="(item, i) in days"
            :key="`month_${i}`"
          >
            {{ item.date }} {{ item.dayOfWeek }} {{ item.day }}
          </p>
        </div>
      </div>

      <!-- #region Calendar -->
      <div class="ca-full">
        <!-- #region Header -->
        <header class="ca-header rtl">
          <!-- #region Selected Month And Year -->
          <h1 class="selectedYearMonth">
            <span v-if="current"> {{ selected.month }} ماه {{ selected.year }} </span>
          </h1>
          <!-- #endregion -->
          <!-- #region Change Month -->
          <div class="flex items-center">
            <div class="toolbar ltr">
              <button
                type="button"
                class="arrow-left"
              >
                <span class="sr-only">Previous month</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="today"
              >
                امروز
              </button>
              <button
                type="button"
                class="arrow-right"
              >
                <span class="sr-only">Next month</span>
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
          <!-- #endregion -->
        </header>
        <!-- #endregion -->

        <!-- #region Body -->
        <div class="ca-body">
          <!-- #region Days Header -->
          <div class="days-header rtl">
            <div
              v-for="(dow, i) in daysOfWeek"
              :key="`dayOfWeek_${i}`"
              class="item"
            >
              <span class="font-bold text-sm">{{ dow.title }}</span>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Days -->
          <div class="days-content">
            <div class="days rtl">
              <div
                v-for="(day, i) in getDaysOfCalendar"
                :key="`day_${i}`"
                class="day"
                :class="getDay(i) ? 'normal' : 'outBound'"
              >
                <time
                  v-if="getDay(i)"
                  :datetime="getDay(i).dateEn"
                  :class="isToDay(getDay(i)) ? 'today' : ''"
                >{{ getDay(i).day }}</time>
                <div
                  v-if="getDay(i)"
                  class="flex flex-col"
                >
                  <span>{{ getDay(i).date }}</span>
                  <span>{{ getDay(i).dayOfWeek }}</span>
                  <ol
                    v-if="getDay(i).events.length > 0"
                    class="event"
                  >
                    <li
                      v-for="(event, z) in getDay(i).events"
                      :key="`event_${i}${z}`"
                      @click="onEvent(event)"
                    >
                      <a
                        href="javascript:"
                        class="group flex"
                      >
                        <p class="event-title">{{ event.title }}</p>
                        <time
                          :datetime="`${event.date} ${event.time}`"
                          class="event-time"
                        >{{ event.time }}</time>
                      </a>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
  </div>
</template>

<style scoped>
.ca-full {
  @apply lg:flex lg:h-full lg:flex-col flex p-8;

  .ca-header {
    @apply flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none ;

    .selectedYearMonth {
      @apply text-base font-semibold leading-6 text-gray-900;
    }

    .toolbar {
      @apply relative flex items-center rounded-md bg-white shadow-sm md:items-stretch;

      .arrow-left {
        @apply flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50;
      }

      .arrow-right {
        @apply flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50;
      }

      .today {
        @apply hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block;
      }
    }
  }

  .ca-body {
    @apply shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col;

    .days-header {
      @apply grid grid-cols-7 gap-px border-b border-gray-300 bg-white py-3 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none;

      .item {
        @apply flex justify-center bg-white py-2;
      }
    }

    .days-content {
      @apply flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto;
      .days{
        @apply w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px;

        .day {
          @apply relative px-3 py-2;

          .today{
            @apply flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white;
          }

        }

        .day.normal {
          @apply bg-white;
        }

        .day.outBound {
          @apply bg-gray-50 text-gray-500;
        }
      }
    }
  }

}

.event{
  @apply mt-2;
}

.event-title{
  @apply flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600;
}
.event-time{
  @apply ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block;
}
</style>
