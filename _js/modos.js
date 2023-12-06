// Get a reference to the theme switcher element and the document body
const themeToggle = document.getElementById("theme__switcher");
const bodyEl = document.body;


// Function to set the theme
function setTheme(theme) {
    // If the theme is "dark," add the "dark" class, remove "light" class,
    // and adjust filter style
    bodyEl.classList.toggle("dark", theme === "dark");
    // If the theme is "light," add the "light" class, remove "dark" class,
    bodyEl.classList.toggle("light", theme !== "dark");
    // adjust filter of the toggle switch
    themeToggle.style.filter = theme === "dark" ? "invert(75%)" : "none";}


// Function to toggle the theme between light and dark
function toggleTheme() {    setTheme(bodyEl.classList.contains("dark") ? "light" : "dark");}
themeToggle.addEventListener("click", toggleTheme);


// Function to detect user's preferred theme
function detectPreferredTheme() {
    // Check if the user prefers a dark color scheme using media queries
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDarkMode);}
    // Run the function to detect the user's preferred theme
    detectPreferredTheme();


function setTheme(theme) {
    bodyEl.classList.toggle("dark", theme === "dark");
    bodyEl.classList.toggle("light", theme !== "dark");
    themeToggle.style.filter = theme === "dark" ? "invert(75%)" : "none";
    // Setting the theme in local storage
    localStorage.setItem("theme", theme);}
    // Check if the theme is stored in local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {    setTheme(storedTheme);}


function detectPreferredTheme() {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    // Getting the value from local storage
    const storedTheme = localStorage.getItem("theme");
    setTheme(prefersDarkMode && storedTheme !== "light" ? "dark" : "light");}