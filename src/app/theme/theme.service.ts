import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private document = inject<Document>(DOCUMENT);

    public get DarkMode(): boolean {
        return JSON.parse(localStorage.getItem('darkmode')) ?? false;
    }

    public set DarkMode(isDarkMode: boolean) {
        const root = this.document.querySelector(':root');

        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('darkmode', isDarkMode.toString());
    }

    public toggleDarkMode(): boolean {
        this.DarkMode = !this.DarkMode;
        return this.DarkMode;
    }
}
