import { Injectable, inject, DOCUMENT } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private document = inject<Document>(DOCUMENT);

    public toggleDarkMode(): boolean {
        this.DarkMode = !this.DarkMode;
        return this.DarkMode;
    }

    public get DarkMode(): boolean {
        return JSON.parse(localStorage.getItem('darkmode')) ?? false;
    }

    public set DarkMode(isDarkMode: boolean) {
        const root = this.document.querySelector(':root');
        root.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkmode', isDarkMode.toString());
    }
}
