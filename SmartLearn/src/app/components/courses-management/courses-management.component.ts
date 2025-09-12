import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-courses-management',
  templateUrl: './courses-management.component.html',
  styleUrls: ['./courses-management.component.css']
})
export class CoursesManagementComponent implements OnInit {
  loading: boolean = false;
  courses: Cours[] = [];
  error: string | null = null;

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.dashboardService.getCourses().subscribe({
      next: (res: Cours[]) => {
        this.courses = res ?? [];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Something went wrong, please try again.';
        this.loading = false;
      }
    });
  }

  deleteCourse(courseId: string) {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذا الكورس؟')) return;

    this.loading = true;
    this.dashboardService.deleteCourse(courseId).subscribe({
      next: () => {
        this.loadCourses();
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Something went wrong, please try again.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard/overview']);
   }
}
