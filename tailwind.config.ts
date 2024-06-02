/** @type {import('tailwindcss').Config} */

import { eventTypes } from "./src/lib/utils/EventTypeStyle"

const customColors = eventTypes().flatMap(et => {
  return [et.background, et.ring, et.shadow, et.text]
})

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: customColors
};