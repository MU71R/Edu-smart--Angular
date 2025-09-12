import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // ✅ لازم تضيف ده
import { Cours } from 'src/app/models/cours';
import { Instructor } from 'src/app/models/instructor';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-approve-courses', // ✨ خلي الاسم أوضح
  templateUrl: './dashboard-approve-courses.component.html',
  styleUrls: ['./dashboard-approve-courses.component.css']
})
export class DashboardApproveCoursesComponent implements OnInit {
  courses: Cours[] = [];
  loading = true;

  constructor(private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.dashboardService.getPendingCourses().subscribe((res: Cours[]) => {
      this.courses = res;
      this.loading = false;
    });
  }

  viewCourse(id: string) {
    this.router.navigate(['/course-approve', id]);
  }
}