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

function addColorCssProperties({ addComponents, config }) {
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

  addComponents({ ':root': cssProperties });
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
    underlineOffset: {
      sm: '0.08em',
      md: '0.12em',
    },
    underlineThickness: {
      thin: '2px',
    },
    extend: {
      transitionProperty: {
        width: 'width',
        height: 'height',
      },
    },
  },
  plugins: [
    customContainer,
    addColorCssProperties,
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-underline-utils'),
  ],
};
