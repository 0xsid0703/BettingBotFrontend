/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "pink-1": '#F2F4F7',
        "pink-2": "#FEE4E2",
        "green-2": "#D1FADF",
      },
      textColor: {
        "black-1": "#344054",
        "black-2": "#101828",
        "blue-1": "#2E90FA",
        "grey-1": "#98A2B3",
        "grey-2": "#667085",
        "green-1": "#039855",
        "red-1": "#D92D20",
      },
      borderColor: {
        'grey-1': '#D0D5DD'
      },
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}

