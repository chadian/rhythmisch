import { themeDefinitions } from './theme-definitions';
import { pullBackgroundColor } from '../../utils/pull-background-color';

const WIDTH = 32;
const HEIGHT = 32;

export function setFavicon(themeKey) {
  const theme = themeDefinitions.find(
    ({ themeName }) => themeName === themeKey
  );

  const faviconBackgroundColor = pullBackgroundColor(theme.stripeBgClass);
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const context = canvas.getContext('2d');

  // draw background
  context.fillStyle = faviconBackgroundColor;
  context.fillRect(0, 0, WIDTH, HEIGHT);

  // draw circle
  const centerX = WIDTH / 2;
  const centerY = HEIGHT / 2;
  const radius = 8;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'white';
  context.fill();
  context.closePath();

  // extract canvas to a data url and set favicon dom element
  const dataUrl = canvas.toDataURL();
  let faviconElement = document.querySelector('link[rel="icon"]');

  if (!faviconElement) {
    faviconElement = document.createElement('link');
    faviconElement.setAttribute('rel', 'icon');
    document.head.appendChild(faviconElement);
  }

  faviconElement.setAttribute('href', dataUrl);
}
