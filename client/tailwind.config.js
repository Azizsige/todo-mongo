/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Rosario: ["Rosario", "sans-serif"],
      },
      colors: {
        primaryColor: "#000000",
        secondaryColor: "#FF4F5A",
      },
    },
  },
  plugins: [require("preline/plugin"), require("flowbite/plugin")],
};
