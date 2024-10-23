<template>
  <div class="body">
    <!-- component -->
    <div class="relative flex text-gray-800 antialiased flex-col justify-center overflow-hidden px-5">
      <div class="relative py-3 w-full mx-auto text-center">
        <div class="mt-1 bg-white shadow-md rounded-lg text-left">
          <div class="h-2 bg-purple-400 rounded-t-md" />
          <div
            class="grid grid-cols-4 gap-2 px-8 py-2 w-full text-right justify-start"
            style="direction: rtl"
          >
            <div class="col-span-1">
              <label> عنوان </label>
              <input
                v-model="form.title"
                type="text"
                placeholder="عنوان را وارد کنید"
              >
            </div>
            <div class="col-span-1">
              <label> تاریخ </label>
              <input
                v-model="form.date"
                type="text"
                placeholder="تاریخ را وارد کنید"
              >
            </div>
            <div class="col-span-1">
              <label> ساعت </label>
              <input
                v-model="form.time"
                type="text"
                placeholder="ساعت را وارد کنید"
              >
            </div>

            <div class="col-span-1 flex justify-center items-center w-full">
              <button
                type="submit"
                class="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600 "
                @click="addEvent"
              >
                اضافه کردن رویداد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <JalaliCalendar
      :events="events"
      cell-class=""
      cell-today-class=""
      :show-month-selector="true"
      @on-change-month="onChangeMonthListener"
      @on-event="eventClickListener"
    >
      <!-- #region Use Template : Custom Button On Header -->
      <template #customButton>
        <button type="button">
          Click Me
        </button>
      </template>
      <!-- #endregion -->
      <!-- #region Use Template : Custom Event -->
      <template #event="{ event }">
        <a
          href="javascript:"
          class="flex rounded-lg p-2 bg-rose-400 text-white"
        >
          <p class="custom-title">{{ event.title }} (سفارشی شده)</p>
        </a>
      </template>
      <!-- #endregion -->
    </JalaliCalendar>
  </div>
</template>

<script setup lang="ts">
// #region interface & enum
interface DayEvent {
  id: number
  title: string
  color: string
  time: string
  date: string
  extra?: any
  action: EventActions
}
enum EventActions {
  NONE = 0,
  GOTO_URL = 1,
  ALERT = 2,
}
// #endregion

// #region variables
const _events = ref<DayEvent[]>([
  {
    id: 1,
    title: 'تست',
    color: 'red',
    time: '12:45',
    date: '1403/07/23',
    action: EventActions.NONE,
  },
  {
    id: 2,
    title: 'این تست دوم جهت اضافه شدن به تقویم است',
    color: 'blue',
    time: '17:23',
    date: '1403/07/23',
    action: EventActions.NONE,
  },
  {
    id: 3,
    title: 'مسیر تست',
    color: 'blue',
    time: '18:00',
    date: '1403/07/29',
    action: EventActions.NONE,
  },
  {
    id: 4,
    title: 'تست 4',
    color: 'blue',
    time: '07:00',
    date: '1403/08/02',
    action: EventActions.NONE,
  },
  {
    id: 5,
    title: 'تست 5',
    color: 'blue',
    time: '18:00',
    date: '1403/08/21',
    action: EventActions.NONE,
  },
])

const form = ref<DayEvent>({
  id: 0,
  title: 'تست',
  color: '',
  time: '18:00',
  date: '1403/08/05',
  action: EventActions.NONE,
})
// #endregion

// #region functions
const addEvent = () => {
  _events.value.push({
    id: form.value.id,
    title: form.value.title,
    color: form.value.color,
    time: form.value.time,
    date: form.value.date,
    action: form.value.action,
  })
}
const events = computed<DayEvent[]>(() => {
  return _events.value
})

const eventClickListener = (data: any) => {
  console.log('event Click : ', data)
}
const onChangeMonthListener = (data: any) => {
  console.log('onChangeMonth : ', data)
}
// #endregion
</script>

<style scoped>
input{
  @apply border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md;
}
label{
  @apply block font-semibold mt-3;
}
</style>
