/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        albamon: {
          DEFAULT: "#FF6B00",
          light: "#FFA94D",
          dark: "#CC5600",
        },
        lemon: "#FFF230", // rgb(255, 242, 48)
        sunflower: "#FFE000", // rgb(255, 224, 0)
        dark: "#1A1A1A",
        softGray: "#F5F5F5",
        orangeAccent: "#FF6B00",
        blueAccent: "#0066FF",
      },
    },
  },
  plugins: [],
};
