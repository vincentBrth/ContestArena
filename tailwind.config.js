/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Defaults
        'default': {
          lightest: '#f5f5f5',
          light: '##556167',
          DEFAULT: '#353535',
          dark: '#202020',
          darkest: '#050505',
        },

        // Neutrals
        'neutral': {
          lightest: '#f1f5fa',
          light: '#b9c6d7',
          DEFAULT: '#859bb9',
          dark: '#4c6688',
          darkest: '#1e3c63',
        },

        // Dangers
        'danger': {
          lightest: '#ffe4e5',
          light: '#ff747a',
          DEFAULT: '#d11018',
          dark: '#bb171b',
          darkest: '#962123',
        },

        // Warnings
        'warning': {
          lightest: '#fff1c8',
          light: '#fbd579',
          DEFAULT: '#f6bd41',
          dark: '#ce8d18',
          darkest: '#9e5e00',
        },

        // Infos
        'info': {
          lightest: '#e3f1ff',
          light: '#64b2f5',
          DEFAULT: '#1991eb',
          dark: '#1d67b9',
          darkest: '#234987',
        },
        // Success
        'success': {
          lightest: '#e6fff4',
          light: '#7be3bc',
          DEFAULT: '#00cd85',
          dark: '#0b8e5f',
          darkest: '#016b42',
        },
        // Paris
        'paris': {
          lightest: '#a7a5c9',
          light: '#575493',
          DEFAULT: '#2c275f',
          dark: '#09072e',
          darkest: '#030322',
        },
        // Linens
        'linen': {
          lightest: '#fdfaf7',
          light: '#faf5ef',
          DEFAULT: '#f7efe5',
          dark: '#f4e9da',
          darkest: '#f0dcc3',
        },
        // Purples rain
        'purple-rain': {
          lightest: '#edebff',
          light: '#b9b6f1',
          DEFAULT: '#8282dc',
          dark: '#5745b1',
          darkest: '#381c80',
        },
      },
    },
  },
  plugins: [],
}
