module.exports = {
  content: ["./public/**/*.{html,js}"],
  plugins: [require("daisyui")],
  safelist: [],
  theme: {
    extend: {
      container: {
        center: true,
      },
      extend: {
        fontFamily: {
          'sans': ['Poppins , sans-serif'],
        },
      }
    },
  },
};
