import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  activeComp: string = 'overview';
  activeComp2: string = 'instructor';
  activeComp3: string = 'approveCourses';
  showComponent(comp: string) {
    this.activeComp = comp;
    this.activeComp2 = comp;
    this.activeComp3 = comp;
  }

  logout() {
    // هنا تحط منطق تسجيل الخروج
    console.log('Logging out...');
  }
}
