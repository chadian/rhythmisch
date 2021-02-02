function customContainer({ addComponents, theme }) {
  addComponents({
    ".container": {
      marginInline: "auto",
      maxWidth: theme("screens.sm"),

      // Breakpoints
      "@screen sm": {
        maxWidth: theme("screens.sm"),
      },
      "@screen md": {
        maxWidth: theme("screens.md"),
      },
    },
  });
}



module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [customContainer],
};
