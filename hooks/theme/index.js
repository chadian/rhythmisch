import React, { createContext, useState, useContext } from 'react';
import { getLocalStorageTheme, setLocalStorageTheme } from './local-storage';
import {
  themeDefinitions,
  DEFAULT_THEME,
  themeKeys,
} from './theme-definitions';
export { themeKeys, themeDefinitions };

const ThemeContext = createContext();

export const ThemeProvider = ({ value, children }) => {
  const { theme: localStorageTheme } = getLocalStorageTheme() ?? {};
  const initialThemeName = value ?? localStorageTheme ?? DEFAULT_THEME;
  const [themeName, setThemeName] = useState(initialThemeName);

  const saveTheme = (theme) => {
    if (themeKeys.includes(theme)) {
      setLocalStorageTheme({ theme });
      setThemeName(theme);
    }
  };

  const themeDefinition = themeDefinitions.find(
    (themeDefinition) => themeDefinition.themeName === themeName
  );

  if (!themeDefinition) {
    const possibleThemes = themeDefinitions
      .map((def) => def.themeName)
      .join(', ');
    throw new Error(
      `No theme definition found for theme ${themeName}. Possible themes are ${possibleThemes}}`
    );
  }

  return (
    <ThemeContext.Provider value={[themeDefinition, saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
