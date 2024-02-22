import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public static isDarkMode: boolean = false;

  private style: HTMLLinkElement;

  public get DarkMode(): boolean {
    return localStorage.getItem('darkmode') === 'true' || ThemeService.isDarkMode;
  }

  public set DarkMode(value: boolean) {
    localStorage.setItem('darkmode', value.toString());
    this.style.href = this.getStyleName(this.DarkMode);
  }

  constructor() {
    this.style = document.createElement('link');
    this.style.rel = 'stylesheet';
    this.style.type = 'text/css';
  }

  private getStyleName(isDarkMode: boolean): string {
    return isDarkMode ? 'dark.css' : 'light.css';
  }

  public toggleDarkMode(): boolean {
    this.style.href = this.getStyleName(!this.DarkMode);
    localStorage.setItem('darkmode', (!this.DarkMode).toString());
    return this.DarkMode;
  }

  public initTheme(): Observable<boolean> {
    this.style.href = this.getStyleName(this.DarkMode);
    document.head.appendChild(this.style);
    return of(true);
  }
}
