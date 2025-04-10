const root = this.document.querySelector(':root');

if (isDarkMode()) {
    root.classList.add('dark');
} else {
    root.classList.remove('dark');
}

function isDarkMode() {
    return JSON.parse(localStorage.getItem('darkmode')) ?? false;
}
