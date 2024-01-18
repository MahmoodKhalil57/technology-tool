/** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: false,
    themeRoot: ":root", // The element that receives theme color CSS variables
  },

  plugins: [require("tailwind-icones-plugin"), require("daisyui")],
};
