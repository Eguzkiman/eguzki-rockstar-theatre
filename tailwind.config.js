// https://tailwindcss.com/docs/guides/create-react-app#configure-tailwind-to-remove-unused-styles-in-production
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '3/2': '150%',
        '1/2': '50%',
        '2/3': '66.666667%',
        '4/3': '133.333334%',
        'modal': '850px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
