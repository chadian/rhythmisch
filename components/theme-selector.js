import { useTheme, themeKeys, themeDefinitions } from '../hooks/theme/index';

export default function ThemeSelector() {
  const [ currentThemeDefinition, saveTheme ] = useTheme();

  const themeSelectors = themeKeys.map(key => {
    const themeDefinition = themeDefinitions.find(themeDefinition => themeDefinition.themeName === key);
    const selectorColor = themeDefinition.stripeBgClass;
    const saveSelectedTheme = () => saveTheme(key);
    const classNames = [
      selectorColor,
      "rounded-full",
      "p-2",
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

    const className = classNames.join(' ');
    return (
      <button
        key={key}
        className={className}
        onClick={saveSelectedTheme}
      ></button>
    );
  });

  return (
    <div className="flex space-x-7 items-center">
      {themeSelectors}
    </div>
  );
}
