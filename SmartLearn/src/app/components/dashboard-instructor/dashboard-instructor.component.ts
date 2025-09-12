import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Instructor } from 'src/app/models/instructor';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-instructor',
  templateUrl: './dashboard-instructor.component.html',
  styleUrls: ['./dashboard-instructor.component.css']
})
export class DashboardInstructorComponent {
  instructors: Instructor[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadInstructors();
  }

  loadInstructors() {
    this.dashboardService.getPendingInstructors().subscribe((res: any[]) => {
      this.instructors = res;
      this.loading = false;
    });
  }

  viewDetails(id: string) {
    this.router.navigate(['/instructor-detail', id]);
  }
}
