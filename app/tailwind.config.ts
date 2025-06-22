import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'
import forms from '@tailwindcss/forms'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', '"Noto Sans"', 'sans-serif'],
      },
      colors: {
        background: '#101a23',
        primary: '#223649',
        muted: '#90adcb',
      },
    },
  },
  plugins: [animate, forms],
} satisfies Config
