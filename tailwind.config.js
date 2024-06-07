/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./public/index.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "red-1": "#EB0000",
      "yellow-1": "#FFD600",
      "black-1": "#000000",
      "grey-1": "#828282",
      "grey-2": "#BABABA",
      "grey-3": "#D9D9D9",
      "grey-4": "#E6E6E6",
      "grey-5": "#F4F4F4",
      "grey-6": "#F7F7F7",
      "white-1": "#FFFFFF",
      "blue-1": "#004CC7",
      "blue-2": "#487FD7",
      "blue-3": "#91AFFF",
      "blue-4": "#DAE5F7",
      "dark-blue-1": "#0042AE",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
