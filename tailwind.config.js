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

function addColorCssProperties({ addComponents, config }) {
  const colors = config(`theme.colors`, []);
  const cssProperties = {};

  for (const color in colors) {
    const colorObj = colors[color];

    for (colorKey in colorObj) {
      const hexValue = colorObj[colorKey].toString();
      const cssPropertyName = `--color-${color}-${colorKey}`.replace(
        /-default$/,
        ""
      );

      cssProperties[cssPropertyName] = hexValue;
    }
  }

  addComponents({ ':root': cssProperties });
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
  plugins: [customContainer, addColorCssProperties],
};
