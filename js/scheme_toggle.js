const colorSchemeBtn = document.querySelector("[data-color-scheme]");

const colorSchemeURL = {
  dark: "./css/dark_scheme/dark-scheme-variables.css",
  light: "./css/light_mode/light-mode-variable.css",
};

colorSchemeBtn.addEventListener("click", changeColorScheme);

// setting user-scheme if site visited before and saved with different color-scheme
storeColorScheme("user");

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

  storeColorScheme("light");
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

  storeColorScheme("dark");
}

function storeColorScheme(colorScheme = "user") {
  switch (colorScheme) {
    case "light":
      localStorage.setItem("userColorScheme", colorScheme);
      break;
    case "dark":
      localStorage.setItem("userColorScheme", colorScheme);
      break;
    case "user":
      const userColorScheme = localStorage.getItem("userColorScheme")
        ? localStorage.getItem("userColorScheme")
        : "light";
      userColorScheme === "light" ? lightColorScheme() : darkColorScheme();
      localStorage.setItem("userColorScheme", userColorScheme);
      break;

    default:
      console.log("invalid color scheme requested.");
  }

  console.log(colorScheme, "scheme applied.");
}
