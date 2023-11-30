/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      screens: {
        xs: "450px",
        sm: "640px",
        md: "800px",
        lg: "1260px",
        xl: "1560px",
        heroContact: "900px"
      }
    },
  },
  plugins: [],
}

