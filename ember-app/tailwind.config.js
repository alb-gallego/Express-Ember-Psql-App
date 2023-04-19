/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./app/**/*.{html,js,ts,hbs}`, `./translations/*.yaml`],
  theme: {
    extend: {
      zIndex: {
        1: '1',
      },
    },
  },
  plugins: [],
};
