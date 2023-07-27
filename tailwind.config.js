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
        Rowdies: ["Rowdies", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primaryColor: "#000000",
        secondaryColor: "#FF4F5A",
        thirdColor: "#FAFAFA",
      },
      screens: {
        xs: "360px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [require("preline/plugin"), require("flowbite/plugin")],
};
