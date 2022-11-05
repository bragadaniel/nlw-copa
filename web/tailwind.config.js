/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      backgroundImage: {
        app: "url(/app-bg.png)",
      },
      colors: {
        ignite: {
          500: "#129E57",
        },
        yellow: {
          500: "#F7DD43",
        },
        gray: {
          100: "#E1E1E6",
          200: "#323238",
          400: "#8D8D99",
          900: "#121214",
          950: "#202024",
        },
      },
    },
  },
  plugins: [],
};
