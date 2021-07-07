import React, { createContext, useState, useContext } from 'react';
import { getLocalStorageTheme, setLocalStorageTheme } from './local-storage';
import { setFavicon } from './set-favicon';
import {
  themeDefinitions,
  DEFAULT_THEME,
  themeKeys,
} from './theme-definitions';

export { themeKeys, themeDefinitions };

const ThemeContext = createContext();

// eslint-disable-next-line react/prop-types
export const ThemeProvider = ({ value, children }) => {
  const { theme: localStorageTheme } = getLocalStorageTheme() ?? {};
  const initialThemeName = value ?? localStorageTheme ?? DEFAULT_THEME;
  const [themeKey, setThemeName] = useState(initialThemeName);
  setFavicon(themeKey);

  const saveTheme = (themeKey) => {
    if (themeKeys.includes(themeKey)) {
      setLocalStorageTheme({ theme: themeKey });
      setThemeName(themeKey);
      setFavicon(themeKey);
    }
  };

  const themeDefinition = themeDefinitions.find(
    (themeDefinition) => themeDefinition.themeName === themeKey
  );

  if (!themeDefinition) {
    const possibleThemes = themeDefinitions
      .map((def) => def.themeName)
      .join(', ');
    throw new Error(
      `No theme definition found for theme ${themeKey}. Possible themes are ${possibleThemes}}`
    );
  }

  return (
    <ThemeContext.Provider value={[themeDefinition, saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
