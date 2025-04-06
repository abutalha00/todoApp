const colorSchemeSwitch = document.querySelector(`label[data-color-scheme]`);

colorSchemeSwitch.addEventListener("click", toggleColorScheme);

function toggleColorScheme(event) {
  const isLight =
    colorSchemeSwitch.getAttribute("data-color-scheme") === "light"
      ? "light"
      : "dark";

    if (isLight === "light") {
        console.log("light")
        colorSchemeSwitch.setAttribute("data-color-scheme", "dark");
        return;
    } 

    colorSchemeSwitch.setAttribute("data-color-scheme", "light");
    console.log(isLight)
}
