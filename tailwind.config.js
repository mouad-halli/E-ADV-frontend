/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
            primary: '#27367B',
            secondary: '#A2AEE2',
            accent: '#ECEFFF',
            customGrey: '#CBCBCB'
        }
    },
  },
  plugins: [],
}

