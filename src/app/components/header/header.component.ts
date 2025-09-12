import { Component} from '@angular/core';
// import { DarkModeService } from '../../services/dark-mode.service';
import {faMoon,faSun,faLanguage,faBars,faTimes} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router,private authService: AuthService) { }
  isDarkMode = false;   
  isMenuOpen = false;
  isLoggedIn = false;

  faMoon = faMoon;
  faSun = faSun;
  faBars = faBars;
  faTimes = faTimes;
  faLanguage = faLanguage;


userData: any;

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
    // أول ما الكومبوننت يفتح يتحقق هل فيه token ولا لأ
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.authService.logout();
    this.router.navigate(['/home']);
    this.isLoggedIn = false;
  }
  // constructor(private darkModeService: DarkModeService) {
  //   this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  // }

  // toggleDarkMode() {
  //   this.darkModeService.toggleDarkMode();
  // }
}

