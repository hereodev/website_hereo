import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    // themes: ["halloween"],
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["halloween"],
          "base-100": "#000000",
          // secondary: "teal",
          'tag-green': '#01FF00', // Bright Green
          'tag-blue': '#0000FF', // Blue
          'tag-red': '#FF0000', // Red
          'tag-purple': '#FF00FF', // Purple
          'tag-light-blue': '#01FFFF', // Light Blue
          editable: '#01FFFF', // Light Blue
          timeline: '#FFFF00', // Bright Yellow
        },
      },
    ],
  },
};
export default config;
