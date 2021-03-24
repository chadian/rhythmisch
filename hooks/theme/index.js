import React, { createContext, useState, useContext } from "react";
import { getLocalStorageTheme, setLocalStorageTheme } from './local-storage';

const themeDefinitions = {
  swiss: {
    stripeBgClass: "bg-red-600",
    occurrenceClosedHitBgColor: "bg-red-600",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-red-600",
    buttonBgColor: "bg-transparent",
  },
};

const DEFAULT_THEME = 'swiss';
export const themeOptions = Object.keys(themeDefinitions);

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  debugger;
  const { theme: localStorageTheme } = getLocalStorageTheme() ?? {};
  const initialThemeName = localStorageTheme ?? DEFAULT_THEME;
  const [themeName, setThemeName] = useState(initialThemeName);

  const saveTheme = (theme) => {
    if (themeOptions.includes(theme)) {
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
