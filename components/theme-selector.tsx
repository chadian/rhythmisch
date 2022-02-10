import React from 'react';
import { useTheme, themeKeys, themeDefinitions } from '../hooks/theme/index';

export default function ThemeSelector() {
  const [currentThemeDefinition, saveTheme] = useTheme();
  const saveSelectedTheme = (key) => saveTheme(key);
  const currentThemeIndex = themeKeys.indexOf(currentThemeDefinition.themeName);

  const onKeyDown = (e) => {
    const RIGHT = 39;
    const LEFT = 37;

    const previousThemeKey = themeKeys[currentThemeIndex - 1];
    const nextThemeKey = themeKeys[currentThemeIndex + 1];

    if (e.keyCode === LEFT && previousThemeKey) {
      saveSelectedTheme(previousThemeKey);
    }

    if (e.keyCode === RIGHT && nextThemeKey) {
      saveSelectedTheme(nextThemeKey);
    }
  };

  const themeSelectors = themeKeys.map((key) => {
    const themeDefinition = themeDefinitions.find(
      (themeDefinition) => themeDefinition.themeName === key
    );
    const isActiveTheme = currentThemeDefinition.themeName === key;
    const selectorColor = themeDefinition.stripeBgClass;
    const classNames = [
      selectorColor,
      'rounded-full',
      'transform',
      'transition-all',
      'duration-75',
      'ease-in',
      'w-4',
      'h-4',
      'md:w-6',
      'md:h-6',
      'cursor-pointer',
    ];

    if (isActiveTheme) {
      classNames.push('scale-150');
    }

    const onClick = () => {
      saveSelectedTheme(key);
    };

    const className = classNames.join(' ');
    return (
      <div
        role="radio"
        aria-checked={isActiveTheme}
        aria-label={themeDefinition.themeName}
        tabIndex={isActiveTheme ? '0' : '-1'}
        key={key}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <div className="p-4 -m-4">
          <div className={className}></div>
        </div>
      </div>
    );
  });

  return (
    <div
      className="ml-1 flex space-x-7 items-center"
      role="radiogroup"
      aria-label="Theme Options"
      onKeyDown={onKeyDown}
    >
      {themeSelectors}
    </div>
  );
}
