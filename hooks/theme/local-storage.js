const THEME_LOCAL_STORAGE_KEY = "app.theme";

export function getLocalStorageTheme() {
  try {
    const jsonData = window.localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    const themeData = JSON.parse(jsonData);
    return themeData;
  } catch {
    return;
  }
}

export function setLocalStorageTheme(themeData) {
  window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify(themeData));
}
