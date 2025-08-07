import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'media-max-h': { raw: '(max-height: {px})' },
        'media-min-h': { raw: '(min-height: {px})' },
      },
    },
  },
}

export default config
