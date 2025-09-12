import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private currentTheme: string = 'light-theme';

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved) {
      this.currentTheme = saved;
      document.body.classList.add(this.currentTheme);
    }
  }

  getTheme() {
    return this.currentTheme;
  }

  toggleTheme() {
    document.body.classList.remove(this.currentTheme);
    this.currentTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
