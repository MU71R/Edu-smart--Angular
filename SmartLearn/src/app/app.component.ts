import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  })
export class AppComponent {
  title = 'SmartLearn';
  admin:boolean = false;
  constructor(private authService: AuthService) {
    // متابعة حالة المستخدم مباشرة
    this.authService.user$.subscribe(user => {
      this.admin = user?.role === 'admin';
    });
  }
}
