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

    public set DarkMode(value: boolean) {
        localStorage.setItem('darkmode', value.toString());

        if (value) {
            const root = this.document.querySelector(':root');
            root.classList.toggle('dark');
        }
    }

    public toggleDarkMode(): boolean {
        const root = this.document.querySelector(':root');
        root.classList.toggle('dark');
        localStorage.setItem('darkmode', (!this.DarkMode).toString());
        return this.DarkMode;
    }

    public initUserPreference() {
        if (this.DarkMode) {
            const root = this.document.querySelector(':root');
            root.classList.toggle('dark');
        }
    }
}
