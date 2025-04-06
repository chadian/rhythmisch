import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';
import { getLocalStorageTheme, setLocalStorageTheme } from './local-storage';
import { setFavicon } from './set-favicon';
import {
  themeDefinitions,
  DEFAULT_THEME,
  themeKeys,
  ThemeDefinition,
} from './theme-definitions';

export { themeKeys, themeDefinitions };

type SaveTheme = (string) => void;

const ThemeContext = createContext<[ThemeDefinition, SaveTheme]>([
  themeDefinitions[DEFAULT_THEME],
  () => {},
]);

type ThemeProviderProps = { initialThemeKey?: string };

export const ThemeProvider = ({
  initialThemeKey,
  children,
}: PropsWithChildren<ThemeProviderProps>) => {
  const { theme: localStorageThemeKey } = getLocalStorageTheme() ?? {};
  const initialThemeName =
    initialThemeKey ?? localStorageThemeKey ?? DEFAULT_THEME;
  const [themeKey, setThemeName] = useState<string>(initialThemeName);
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
      `No theme definition found for theme key ${themeKey}. Possible theme keys are ${possibleThemes}}`
    );
  }

  return (
    <ThemeContext.Provider value={[themeDefinition, saveTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
