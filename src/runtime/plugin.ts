import moment from 'moment-jalaali'
import VueTippy from 'vue-tippy'
import { defineNuxtPlugin } from '#app'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Plugin injected by Cap Jalali Calendar Nuxt3!')
  nuxtApp.provide('momentJalali', moment)
  nuxtApp.vueApp.use(VueTippy)
})
