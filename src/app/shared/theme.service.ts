import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public static default = 'light';

  private readonly style: HTMLLinkElement;

  public get current(): string {
    return localStorage.getItem('theme') ?? ThemeService.default;
  }

  public set current(value: string) {
    localStorage.setItem('theme', value);
    this.style.href = `${value}.css`;
  }

  constructor() {

    this.style = document.createElement('link');
    // debugger;

    this.style.rel = 'stylesheet';
    this.style.type = "text/css";
    this.style.href = `${this.current}.css`;

    document.head.appendChild(this.style);

  }

}
