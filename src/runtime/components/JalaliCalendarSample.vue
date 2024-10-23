<script setup lang="ts">
import {convertToJalali,getMonthsOfYear} from "../utils/timing"
import type {DayOfWeek, Month} from "~/src/runtime/interfaces/calendar";
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
});

const year = ref<number>(1403);
const month = ref<Month>({id:6,title:'شهریور'});
const months = ref<any[]>([]);
const daysOfWeek = ref<DayOfWeek[]>([
  {id:0,abbr:'ش',title:'شنبه'},
  {id:1,abbr:'یک',title:'یکشنبه'},
  {id:2,abbr:'دو',title:'دوشنبه'},
  {id:3,abbr:'سه',title:'سه شنبه'},
  {id:4,abbr:'چهار',title:'چهارشنبه'},
  {id:5,abbr:'پنج',title:'پنجشنبه'},
  {id:6,abbr:'جمعه',title:'جمعه'},
]);

onMounted(async () => {
  months.value = getMonthsOfYear(year.value);

  console.log(convertToJalali(new Date().toString()));
})
</script>

<template>
  <div>
<!--<div class="flex flex-col">-->
<!--  <div class="text-sm color-danger-500">-->
<!--    Hello {{message}}-->
<!--    <p v-for="(item , i) in months" :key="`month_${i}`">{{item.name}}-{{item.start}}:{{item.end}}</p>-->
<!--  </div>-->
<!--</div>-->

  <!-- component -->
  <div class="ca-full">

    <!--#region Header-->
    <header class="ca-header rtl">
      <!--#region Selected Month And Year-->
      <h1 class="selectedYearMonth">
        <span> {{month.title}} {{year}} </span>
      </h1>
      <!--#endregion-->
      <!--#region Change Month-->
      <div class="flex items-center">
        <div class="toolbar ltr">
          <button type="button" class="arrow-left">
            <span class="sr-only">Previous month</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
          <button type="button" class="today">نمایش امروز</button>
          <button type="button" class="arrow-right">
            <span class="sr-only">Next month</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <!--#endregion-->
    </header>
    <!--#endregion-->

    <!--#region Body-->
    <div class="ca-body">

      <!--#region Days Header-->
      <div class="days-header rtl">
        <div class="item" v-for="(dow ,i) in daysOfWeek" :key="`dayOfWeek_${i}`">
          <span>{{dow.title}}</span>
        </div>
      </div>
      <!--#endregion-->

      <!--#region Days-->
      <div class="days-content">
        <div class="w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
          <div class="day outBound">
            <time datetime="2021-12-27">27</time>
          </div>
          <div class="day outBound">
            <time datetime="2021-12-28">28</time>
          </div>
          <div class="day outBound">
            <time datetime="2021-12-29">29</time>
          </div>
          <div class="day outBound">
            <time datetime="2021-12-30">30</time>
          </div>
          <div class="day outBound">
            <time datetime="2021-12-31">31</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-01">1</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-01">2</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-03">3</time>
            <ol class="mt-2">
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Design review</p>
                  <time datetime="2022-01-03T10:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">10AM</time>
                </a>
              </li>
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sales meeting</p>
                  <time datetime="2022-01-03T14:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM</time>
                </a>
              </li>
            </ol>
          </div>
          <div class="day normal">
            <time datetime="2022-01-04">4</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-05">5</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-06">6</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-07">7</time>
            <ol class="mt-2">
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Date night</p>
                  <time datetime="2022-01-08T18:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">6PM</time>
                </a>
              </li>
            </ol>
          </div>
          <div class="day normal">
            <time datetime="2022-01-08">8</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-09">9</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-10">10</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-11">11</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-12" class="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</time>
            <ol class="mt-2">
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Sam's birthday party</p>
                  <time datetime="2022-01-25T14:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2PM</time>
                </a>
              </li>
            </ol>
          </div>
          <div class="day normal">
            <time datetime="2022-01-13">13</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-14">14</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-15">15</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-16">16</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-17">17</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-18">18</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-19">19</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-20">20</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-21">21</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-22">22</time>
            <ol class="mt-2">
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Maple syrup museum</p>
                  <time datetime="2022-01-22T15:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">3PM</time>
                </a>
              </li>
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Hockey game</p>
                  <time datetime="2022-01-22T19:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">7PM</time>
                </a>
              </li>
            </ol>
          </div>
          <div class="day normal">
            <time datetime="2022-01-23">23</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-24">24</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-25">25</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-26">26</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-27">27</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-28">28</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-29">29</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-30">30</time>
          </div>
          <div class="day normal">
            <time datetime="2022-01-31">31</time>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-01">1</time>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-02">2</time>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-03">3</time>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-04">4</time>
            <ol class="mt-2">
              <li>
                <a href="#" class="group flex">
                  <p class="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">Cinema with friends</p>
                  <time datetime="2022-02-04T21:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">9PM</time>
                </a>
              </li>
            </ol>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-05">5</time>
          </div>
          <div class="day outBound">
            <time datetime="2022-02-06">6</time>
          </div>
        </div>
      </div>
      <!--#endregion-->
    </div>
    <!--#endregion-->

  </div>
  </div>
</template>

<style scoped>

.ca-full{
  @apply lg:flex lg:h-full lg:flex-col flex p-8;

  .ca-header{
    @apply flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none ;

    .selectedYearMonth{
      @apply text-base font-semibold leading-6 text-gray-900;
    }

    .toolbar{
      @apply relative flex items-center rounded-md bg-white shadow-sm md:items-stretch;

      .arrow-left{
        @apply flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50;
      }
      .arrow-right{
        @apply flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50;
      }

      .today{
        @apply hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block;
      }
    }
  }

  .ca-body{
    @apply shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col;

    .days-header{
      @apply grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none;

      .item{
        @apply flex justify-center bg-white py-2;
      }
    }

    .days-content{
      @apply flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto;

      .day{
        @apply relative px-3 py-2;
      }
      .day.normal{
        @apply bg-white;
      }
      .day.outBound{
        @apply bg-gray-50 text-gray-500;
      }
    }
  }

}


</style>
