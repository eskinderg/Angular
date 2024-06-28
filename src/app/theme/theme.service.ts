import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    public static isDarkMode: boolean = false;

    private style: HTMLLinkElement;

    public get DarkMode(): string {
        return localStorage.getItem('darkmode') ?? String(ThemeService.isDarkMode);
    }

    public set DarkMode(value: string) {
        localStorage.setItem('darkmode', value);
        this.style.href = this.getStyleName(this.DarkMode);
    }

    constructor() {
        this.style = document.createElement('link');
        this.style.rel = 'stylesheet';
        this.style.type = 'text/css';
    }

    private getStyleName(isDarkMode: string): string {
        return JSON.parse(isDarkMode) ? 'dark.css' : 'light.css';
    }

    public toggleDarkMode(): string {
        this.style.href = this.getStyleName(String(!JSON.parse(this.DarkMode)));
        localStorage.setItem('darkmode', String(!JSON.parse(this.DarkMode)));
        return this.DarkMode;
    }

    public initTheme(): Observable<boolean> {
        this.style.href = this.getStyleName(this.DarkMode);
        document.head.appendChild(this.style);
        return of(true);
    }
}
