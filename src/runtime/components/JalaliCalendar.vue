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

enum MonthAction {
  Now = 'now',
  Next = 'next',
  Prev = 'prev',
  Jump = 'jump',
}

// #region Props & Emit
const emit = defineEmits(['onEvent', 'onChangeMonth'])
const props = defineProps({
  events: {
    type: Array<DayEvent>,
    default: [],
    required: false,
  },
  cellClass: {
    type: String,
    required: false,
  },
  cellTodayClass: {
    type: String,
    required: false,
  },
  showMonthSelector: {
    type: Boolean,
    default: false,
    required: false,
  },
})
// #endregion

// #region Variables
const loading = ref<boolean>(true)
const current = ref<Current>(null)
const selected = ref<Current>(null)
const monthSelectorModal = ref<boolean>(false)
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
const calendarCellCount = ref(35)
// #endregion

// #region Functions
const nextMonth = () => {
  selected.value = getCurrentMonthAndYear(selected.value.year, selected.value.month, MonthAction.Next)
  fillMonths()
}
const prevMonth = () => {
  selected.value = getCurrentMonthAndYear(selected.value.year, selected.value.month, MonthAction.Prev)
  fillMonths()
}
const currentMonth = () => {
  selected.value = getCurrentMonthAndYear(selected.value.year, selected.value.month, MonthAction.Now)
  fillMonths()
}
const jumpMonth = (month: string) => {
  selected.value = getCurrentMonthAndYear(current.value.year, month, MonthAction.Jump)
  fillMonths()
}
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
  emit('onChangeMonth', selectedRange)
  days.value = getDaysBetweenDates(selectedRange.start, selectedRange.end)
  generateDays()
  pushEvents()
  loading.value = false
}
const generateDays = () => {
  const startPadding = days.value[0]?.index || 0
  const endPadding = calendarCellCount.value - (days.value.length + startPadding)
  days.value = [
    ...Array(startPadding).fill(null),
    ...days.value,
    ...Array(Math.max(0, endPadding)).fill(null),
  ]
}
const isToDay = (condidateDay: Days): boolean => {
  if (condidateDay) return (convertToJalali(new Date().toString()) == condidateDay.date)
  return false
}
const pushEvents = () => {
  // Clear all events
  days.value.forEach((day: Days) => {
    if (day) day.events = []
  })

  // Fill events
  calendarEvents.value.forEach((ev: DayEvent) => {
    const day = days.value.find((day: Days) => day?.date === ev.date)
    if (day) day.events.push(ev)
  })
}
const onEvent = (day: Days, event: DayEvent) => {
  emit('onEvent', { day, event })
}
// #endregion

// #region Watch
watch(
  () => props.events,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (data: any) => {
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
  <div class="p-5">
    <client-only>
      <!-- #region Loading -->
      <div
        v-if="loading"
        class="flex flex-col justify-center items-center h-56 w-full rtl Estedad_FD_Light"
      >
        <Icon
          name="line-md:loading-twotone-loop"
          size="35"
        />
        <p class="mt-4">
          در حال آماده سازی تقویم ، لطفا صبر کنید ...
        </p>
      </div>

      <!-- #region Main Content -->
      <div v-if="!loading">
        <!-- #region Calendar -->
        <div class="ca-full">
          <!-- #region Header -->
          <header class="ca-header rtl">
            <!-- #region Selected Month And Year -->
            <h1 class="selectedYearMonth Estedad_FD_Medium">
              <span v-if="current"> {{ selected.month }} ماه {{ selected.year }} </span>
            </h1>
            <!-- #endregion -->
            <!-- #region Change Month -->
            <div class="flex items-center">
              <div class="toolbar ltr">
                <!-- BTN Next Month -->
                <button
                  v-tippy="'ماه بعد'"
                  type="button"
                  class="arrow-left"
                  @click="nextMonth"
                >
                  <Icon name="ep:arrow-left-bold" />
                </button>
                <!-- BTN Change Month -->
                <button
                  v-if="showMonthSelector"
                  v-tippy="'انتخاب ماه'"
                  type="button"
                  class="today Estedad_FD_Medium"
                  @click="monthSelectorModal = true"
                >
                  سایر
                </button>
                <!-- BTN Current Month -->
                <button
                  v-tippy="'ماه جاری'"
                  type="button"
                  class="today Estedad_FD_Medium"
                  @click="currentMonth"
                >
                  امروز
                </button>

                <!-- Slot Custom Buttons -->
                <slot name="customButton" />
                <!-- #endregion -->

                <!-- BTN Prev Month -->
                <button
                  v-tippy="'ماه قبل'"
                  type="button"
                  class="arrow-right"
                  @click="prevMonth"
                >
                  <Icon name="ep:arrow-right-bold" />
                </button>
              </div>
            </div>
          <!-- #endregion -->
          </header>
          <!-- #endregion -->

          <!-- #region Body -->
          <div class="ca-body relative">
            <!-- #region Days Header -->
            <div class="days-header rtl">
              <div
                v-for="(dow, i) in daysOfWeek"
                :key="`dayOfWeek_${i}`"
                class="item"
              >
                <span class="font-bold text-sm Estedad_FD_Medium">{{ dow.title }}</span>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Days -->
            <div class="days-content">
              <div class="days rtl Estedad_FD_Light">
                <div
                  v-for="(day, i) in days"
                  :key="`day_${i}`"
                  class="day"
                  :class="[day ? 'normal' : 'outBound', (isToDay(day) && cellTodayClass) ? cellTodayClass : '', (isToDay(day) && !cellTodayClass) ? 'today' : '', cellClass ? cellClass : '']"
                >
                  <div
                    v-if="day"
                    class="flex flex-col"
                  >
                    <div class="flex flex-row justify-between items-center">
                      <span>{{ day.day }}</span>
                      <span
                        v-if="isToDay(day)"
                        class="text-rose-500"
                      > امروز </span>
                    </div>

                    <ol
                      v-if="day.events.length > 0"
                      class="event"
                    >
                      <li
                        v-for="(event, z) in day.events.slice(0, 2)"
                        :key="`event_${i}${z}`"
                        @click="onEvent(day, event)"
                      >
                        <!-- #region Slot برای محتوای رویداد -->
                        <slot
                          name="event"
                          :event="event"
                        >
                          <!-- محتوای پیش‌فرض در صورت نبودن slot -->
                          <a
                            href="javascript:"
                            class="group flex"
                          >
                            <p class="event-title">{{ event.title }}</p>
                            <time
                              v-if="event.time"
                              :datetime="`${event.date} ${event.time}`"
                              class="event-time"
                            >
                              {{ event.time }}
                            </time>
                          </a>
                        </slot>
                      <!-- #endregion -->
                      </li>

                      <li v-if="day.events.length > 2">
                        <a
                          href="javascript:"
                          class="group flex"
                        >
                          <p class="event-title">مشاهده همه موارد</p>
                          <span class="event-time">{{ day.events.length }} مورد</span>
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

          <!-- #region copyright -->
          <a
            href="https://i-cap.ir"
            target="_blank"
            class="copyright Estedad_FD_Light"
          >
            <span class="mx-2">قدرت گرفته از چشم انداز آینده پارسیان</span>
            <img
              src="../assets/img/logo.png"
              class="w-5 h-5 object-cover"
            >
          </a>
        <!-- #endregion -->
        </div>
      <!-- #endregion -->
      </div>

      <!-- #region Month Selector Modal -->
      <div
        v-if="!loading && monthSelectorModal"
        class="monthSelectorModal"
      >
        <div class="body">
          <div class="grid grid-cols-4 gap-4 Estedad_FD_Light rtl">
            <div
              v-for="(month, i) in months"
              :key="`monthSelector_${i}`"
              class="monthItem rtl"
              @click="jumpMonth(month.name);monthSelectorModal = false"
            >
              {{ month.name }}
            </div>
          </div>
          <button
            class="cancelButton Estedad_FD_Light"
            @click="monthSelectorModal = false"
          >
            انصراف
          </button>
        </div>
      </div>
    <!-- #endregion -->
    </client-only>
  </div>
</template>

<style scoped>
.copyright{
  @apply absolute bottom-0 left-0 text-xs p-2 bg-purple-600 text-white justify-center items-center w-auto rounded-b-lg flex flex-row;
  margin-left: 2.8rem;
  bottom: -0.3rem;
}
</style>
