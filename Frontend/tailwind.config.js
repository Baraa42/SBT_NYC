/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /./
    },
  ],
  theme: {
    extend: {
      colors: {
          // Gradient factors
          border_l: "#FF68D5",
          border_via: "#527ED7",
          border_r: "#0BF0FF",

          // Gradient factors
          accent_l: "#459BFF",
          accent_r: "#68DFD8",

          // Specific Colors
          done: "#33C102",
          progress: "#D4BD1B",
          suspended: "#AF1E1E",
        },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
}
