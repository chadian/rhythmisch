import React from "react";
import { useTheme, themeKeys, themeDefinitions } from "../hooks/theme/index";

export default function ThemeSelector() {
  const [currentThemeDefinition, saveTheme] = useTheme();

  const themeSelectors = themeKeys.map((key) => {
    const themeDefinition = themeDefinitions.find(
      (themeDefinition) => themeDefinition.themeName === key
    );
    const selectorColor = themeDefinition.stripeBgClass;
    const saveSelectedTheme = () => saveTheme(key);
    const classNames = [
      selectorColor,
      "rounded-full",
      "transform",
      "transition-all",
      "duration-75",
      "ease-in",
      "w-4",
      "h-4",
      "md:w-6",
      "md:h-6",
    ];

    if (currentThemeDefinition.themeName === key) {
      classNames.push("scale-150");
    }

    const className = classNames.join(" ");
    return (
      <button key={key} onClick={saveSelectedTheme}>
        <div className="p-3 -m-3">
          <div className={className}></div>
        </div>
      </button>
    );
  });

  return (
    <div className="ml-1 flex space-x-7 items-center">{themeSelectors}</div>
  );
}
