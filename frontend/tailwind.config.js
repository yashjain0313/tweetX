import daisyui from "daisyui";
import * as daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(29,155,240)",
        secondary: "rgb(24,24,24)",
      },
    },
  },
  darkMode: "class", // Enable dark mode via class
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        black: {
          ...daisyUIThemes["black"],
          primary: "rgb(29,155,240)",
          secondary: "rgb(24,24,24)",
          "base-100": "#000000",
          "base-content": "#ffffff",
        },
      },
      "light",
    ],
    darkTheme: "black", // Set black as default dark theme
    base: true, // Apply base styles
    styled: true, // Enable component styling
    utils: true, // Enable utility classes
    prefix: "", // No prefix for classes
    logs: false, // Disable logs in console
  },
};
