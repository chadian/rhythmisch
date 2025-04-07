// eslint-disable-next-line @typescript-eslint/no-require-imports
const colors = require('tailwindcss/colors');

function customContainer({ addComponents, theme }) {
  addComponents({
    '.container': {
      marginInline: 'auto',
      maxWidth: theme('screens.sm'),

      // Breakpoints
      '@screen sm': {
        maxWidth: theme('screens.sm'),
      },

      '@screen md': {
        maxWidth: theme('screens.md'),
      },
    },
  });
}

function addColorCssProperties({ addBase, config }) {
  const colors = config(`theme.colors`, []);
  const cssProperties = {};

  for (const color in colors) {
    const colorObj = colors[color];

    for (const colorKey in colorObj) {
      const hexValue = colorObj[colorKey].toString();
      const cssPropertyName = `--color-${color}-${colorKey}`.replace(
        /-default$/,
        ''
      );

      cssProperties[cssPropertyName] = hexValue;
    }
  }

  addBase({ ':root': cssProperties });
}

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/*.mdx',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
    },
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
    },
    textUnderlineOffset: {
      sm: '0.08em',
      md: '0.12em',
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
    },
  },
  plugins: [customContainer, addColorCssProperties],
};
