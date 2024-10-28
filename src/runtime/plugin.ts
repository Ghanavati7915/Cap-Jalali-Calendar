import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css' // optional for styling
import '../runtime/assets/css/style.css'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log('Plugin injected by Cap Jalali Calendar Nuxt3!')
  nuxtApp.vueApp.use(VueTippy)
})
