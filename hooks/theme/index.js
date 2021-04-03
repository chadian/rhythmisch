import React, { createContext, useState, useContext } from "react";
import { getLocalStorageTheme, setLocalStorageTheme } from './local-storage';
import { themeDefinitions, DEFAULT_THEME, themeKeys } from './theme-definitions';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const { theme: localStorageTheme } = getLocalStorageTheme() ?? {};
  const initialThemeName = localStorageTheme ?? DEFAULT_THEME;
  const [themeName, setThemeName] = useState(initialThemeName);

  const saveTheme = (theme) => {
    if (themeKeys.includes(theme)) {
      setLocalStorageTheme({ theme });
      setThemeName(theme);
    }
  };

  return (
    <ThemeContext.Provider value={[themeDefinitions[themeName], saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
