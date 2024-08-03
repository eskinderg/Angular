import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    public static isDarkMode: boolean = false;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    public get DarkMode(): boolean {
        return JSON.parse(localStorage.getItem('darkmode')) ?? ThemeService.isDarkMode;
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

    public initUserPreference() {
        this.DarkMode = JSON.parse(localStorage.getItem('darkmode')) ?? ThemeService.isDarkMode;
    }
}
