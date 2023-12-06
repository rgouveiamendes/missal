//  Check local storage
let localS = localStorage.getItem('theme')
themeToSet = localS
//  if the local storage is not set, we check the OS preference
if (!localS === "dark"){
themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
//  Set the correct theme
document.documentElement.setAttribute('data-theme', themeToSet)