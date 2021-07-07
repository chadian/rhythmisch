// Given a tailwind background color classname, pull its color value
export function pullBackgroundColor(backgroundClassName) {
  const cssVariableName = backgroundClassName.replace('bg-', '--color-');
  const backgroundColor = getComputedStyle(document.body).getPropertyValue(
    cssVariableName
  );

  return backgroundColor.trim();
}
