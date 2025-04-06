const colorSchemeBtn = document.querySelector("[data-color-scheme]");

const colorSchemeURL = {
  dark: "./css/dark_scheme/dark-scheme-variables.css",
  light: "./css/light_mode/light-mode-variable.css",
};

colorSchemeBtn.addEventListener("click", changeColorScheme);

function changeColorScheme(event) {
  const currentColorScheme = colorSchemeBtn.getAttribute("data-color-scheme");

  if (currentColorScheme === "light") darkColorScheme();
  else if (currentColorScheme === "dark") lightColorScheme();
  else console.log("invalid color scheme requested");
}

function lightColorScheme() {
  colorSchemeBtn.setAttribute("data-color-scheme", "light");

  const isExistStyle =
    document.querySelector(
      `[href="./css/dark_scheme/dark-scheme-variables.css"]`
    ) ||
    document.querySelector(`[href="./css/light_mode/light-mode-variable.css"]`);

  if (isExistStyle) isExistStyle.remove();

  const linkElem = document.createElement("link");
  linkElem.setAttribute("rel", "stylesheet");
  linkElem.setAttribute("href", colorSchemeURL.light);
  document.head.appendChild(linkElem);

  console.log("light color scheme (active)");
}

function darkColorScheme() {
  colorSchemeBtn.setAttribute("data-color-scheme", "dark");

  const isExistStyle =
    document.querySelector(
      `[href="./css/dark_scheme/dark-scheme-variables.css"]`
    ) ||
    document.querySelector(`[href="./css/light_mode/light-mode-variable.css"]`);

  if (isExistStyle) isExistStyle.remove();

  const linkElem = document.createElement("link");
  linkElem.setAttribute("rel", "stylesheet");
  linkElem.setAttribute("href", colorSchemeURL.dark);
  document.head.appendChild(linkElem);

  console.log("dark color scheme (active)");
}
