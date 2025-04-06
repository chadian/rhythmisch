import colors from 'tailwindcss/colors';
import underlineUtils from 'tailwind-underline-utils';

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
  purge: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './components/**/*.mdx',
    './hooks/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
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
  plugins: [customContainer, addColorCssProperties, require, underlineUtils],
};
