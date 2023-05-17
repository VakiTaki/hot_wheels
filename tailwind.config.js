/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "myColor1": "#FFFFFF",
        "myColor2": "#DEEFE7",
        "myColor3": "##002333",
        "myColor4": "#A66CFF",
        "myColor5": "#B4BEC9",
      },
    },
  },
  plugins: [],
}