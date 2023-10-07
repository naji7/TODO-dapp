/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "color-primary": "#01051e",
        "color-primary-light": "#020726",
        "color-primary-dark": "#010417",
        "color-secondary": "#ff7d3b",
        "color-gray": "#333",
        "color-white": "#fff",
        "color-blob": "#A427DF",
        "color-dark": "#0B0F19",
      },
    },
    fontSize: {
      sm: "0.7rem",
      lg: "0.9rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
    fontFamily: {
      secondary: ["Viga", "sans-serif"],
    },
    animation: {
      ["infinite-slider"]: "infiniteSlider 20s linear infinite",
    },
    keyframes: {
      shimmer: {
        "100%": { transform: "translateX(100%)" },
      },
      infiniteSlider: {
        "0%": { transform: "translateX(0)" },
        "100%": {
          transform: "translateX(calc(-250px * 1))",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./app/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//       colors: {
//         "color-primary": "#01051e",
//         "color-primary-light": "#020726",
//         "color-primary-dark": "#010417",
//         "color-secondary": "#ff7d3b",
//         "color-gray": "#333",
//         "color-white": "#fff",
//         "color-blob": "#A427DF",
//         "color-dark": "#0B0F19",
//       },
//     },
//   },
//   plugins: [],
// });
