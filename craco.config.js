// https://tailwindcss.com/docs/guides/create-react-app#install-and-configure-craco
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }