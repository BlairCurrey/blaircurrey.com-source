//Remember the theme selection
const themeSwitch = document.querySelector("#theme-switch");
themeSwitch.checked = localStorage.getItem("switchedTheme") === "true";

themeSwitch.addEventListener("change", function (e) {
    if (e.currentTarget.checked === true) {
        // Add item to localstorage
        localStorage.setItem("switchedTheme", "true");
    } else {
        // Remove item if theme is switched back to normal
        localStorage.removeItem("switchedTheme");
    }
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip({
        placement: "top",
    });
});
