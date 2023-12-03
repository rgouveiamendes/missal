//  Switch functio
const switchTheme=() => {
    //  Get the root element and data-theme value
    const rootElem = document.documentElement
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme

    newTheme = (dataTheme === 'light') ? 'dark' : 'light'
    theme__switcher.style.filter = dataTheme === "dark" ? "invert(75%)" : "none";
    //  Set the new attribute
    rootElem.setAttribute('data-theme', newTheme)

    //  Set the new local storage item
    localStorage.setItem('theme', newTheme)
}

//  Add event listener for the theme switcher
document.querySelector('#theme__switcher').addEventListener('click', switchTheme)