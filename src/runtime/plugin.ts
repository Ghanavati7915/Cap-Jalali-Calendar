import * as moment from 'moment-jalaali'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling

export default defineNuxtPlugin((nuxtApp) => {
  console.log('Plugin injected by Cap Jalali Calendar Nuxt3!')
  nuxtApp.vueApp.use(moment)
  // nuxtApp.provide('momentJalali', moment)
  nuxtApp.vueApp.use(VueTippy)
})
