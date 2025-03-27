/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/components/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#295B5B",
        cream: "#FFE6C5",
        link: "#D67C5C",
        nav: "#191D2B",
      },
    },
  },
  plugins: [],
}

