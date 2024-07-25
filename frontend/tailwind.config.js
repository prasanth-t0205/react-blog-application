/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      scrollbar: ["thin", "thumb-white"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
