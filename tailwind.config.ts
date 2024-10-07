import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        main: "#A3E636",
        mainAccent: "#88cc19",
        overlay: "rgba(0,0,0,0.8)",

        bg: "#E0E7F1",
        text: "#000",
        border: "#000",

        primary: "#4CAF4F",
        yellow: "#FFEB3A",

        darkBg: "#111903",
        darkText: "#eeefe9",
        darkBorder: "#000",
        secondaryBlack: "#1b1b1b", // opposite of plain white, not used pitch black because borders and box-shadows are that color
      },
      borderRadius: {
        base: "5px",
      },
      boxShadow: {
        light: "4px 4px 0px 0px #000",
        dark: "4px 4px 0px 0px #000",
      },
      translate: {
        boxShadowX: "4px",
        boxShadowY: "4px",
        reverseBoxShadowX: "-4px",
        reverseBoxShadowY: "-4px",
      },
      fontWeight: {
        base: "500",
        heading: "700",
      },
      fontFamily: {
        sans: ["var(--font-public-sans)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
