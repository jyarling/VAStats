import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import forms from '@tailwindcss/forms'
import containerQueries from '@tailwindcss/container-queries'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [animate, forms, containerQueries],
} satisfies Config
