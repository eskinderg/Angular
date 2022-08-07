import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static isDarkMode: boolean = false;

  private readonly style: HTMLLinkElement;

  public get DarkMode(): boolean {
    return localStorage.getItem('darkmode') === 'true' ?? ThemeService.isDarkMode
  }

  public set DarkMode(value: boolean) {
    localStorage.setItem('darkmode', value.toString());
    this.style.href = this.getStyleName(this.DarkMode);
  }

  constructor() {

    this.style = document.createElement('link');

    this.style.rel = 'stylesheet';
    this.style.type = "text/css";
    this.style.href = this.getStyleName(this.DarkMode);

    document.head.appendChild(this.style);

  }

  private getStyleName(isDarkMode: boolean): string {
    if (isDarkMode)
      return "dark.css"
    else
      return "light.css"
  }

  public toggleDarkMode(): boolean {
    this.DarkMode = !this.DarkMode
    return this.DarkMode
  }

}
