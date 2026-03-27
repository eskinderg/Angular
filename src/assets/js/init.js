const root = this.document.querySelector(':root');

root.classList.toggle('dark', isDarkMode());

function isDarkMode() {
    return JSON.parse(localStorage.getItem('darkmode')) ?? false;
}
