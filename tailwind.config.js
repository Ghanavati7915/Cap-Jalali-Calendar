/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/runtime/**/*.{js,ts,vue,css}'],
  corePlugins: {
    container: false,
    aspectRatio: false,
  },
}
