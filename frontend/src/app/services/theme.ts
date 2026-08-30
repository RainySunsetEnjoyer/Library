import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private readonly storageKey = 'theme';

  constructor() {
    this.loadTheme();
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  getCurrentTheme(): string {
    return localStorage.getItem(this.storageKey) || 'light';
  }

  private setTheme(theme: string): void {
    localStorage.setItem(this.storageKey, theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }

  private loadTheme(): void {
    const theme = this.getCurrentTheme();
    this.setTheme(theme);
  }
}
