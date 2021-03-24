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
    linkColor: "text-red-600",
  },

  edmonton: {
    stripeBgClass: "bg-gray-300",
    occurrenceClosedHitBgColor: "bg-gray-400",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-gray-500",
    buttonBgColor: "bg-transparent",
    linkColor: "text-gray-500",
  },

  portland: {
    stripeBgClass: "bg-green-800",
    occurrenceClosedHitBgColor: "bg-green-800",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-green-900",
    buttonBgColor: "bg-transparent",
    linkColor: "text-green-900",
  },

  ubahn: {
    stripeBgClass: "bg-yellow-400",
    occurrenceClosedHitBgColor: "bg-yellow-400",
    occurrenceClosedMissBgColor: "bg-gray-100",
    occurrenceOpenBgColor: "bg-white",
    buttonTextColor: "text-yellow-600",
    buttonBgColor: "bg-transparent",
    linkColor: "text-yellow-600",
  }
};

const DEFAULT_THEME = 'edmonton';
export const themeOptions = Object.keys(themeDefinitions);

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
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
