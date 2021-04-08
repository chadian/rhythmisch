import { useTheme, themeKeys, themeDefinitions } from '../hooks/theme/index';

export default function ThemeSelector() {
  const [ currentThemeDefinition, saveTheme ] = useTheme();

  const selectors = themeKeys.map(key => {
    const themeDefinition = themeDefinitions.find(themeDefinition => themeDefinition.themeName === key);
    const selectorColor = themeDefinition.stripeBgClass;
    const saveSelectedTheme = () => saveTheme(key);
    const classNames = [selectorColor, "w-6", "h-6", "rounded-full", "border-4", "p-2"];

    if (currentThemeDefinition.themeName === key) {
      classNames.push(themeDefinition.stripeBgClass.replace('bg', 'border'));
    } else {
      classNames.push("border-white");
    }

    const className = classNames.join(' ');
    return <button key={key} className={className} onClick={saveSelectedTheme}></button>;
  });

  return <div className="flex space-x-4">{selectors}</div>;
}
