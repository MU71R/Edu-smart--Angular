import { Component } from '@angular/core';
import { Cours } from 'src/app/models/cours';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-course-details',
  templateUrl: './dashboard-course-details.component.html',
  styleUrls: ['./dashboard-course-details.component.css' ]
})
export class DashboardCourseDetailsComponent {
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute, private router: Router) { }
  course: Cours | null = null;
  loading = true;
  error: string | null = null;
  id: string = '';
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.getCourseDetails();
  }
  getCourseDetails() {
    this.loading = true;
    this.dashboardService.getPendingCourses().subscribe({
        next: (res: any) => {
          this.course = res.find((c: any) => c._id === this.id) || null;
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.loading = false;
          this.error = err.message;
        }
      });
  }
  approveInstructor(id: string) {
    this.dashboardService.updateCourseStatus(id, 'approve').subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'تمت الموافقة على الدورة ✅',
          timer: 2000,
          showConfirmButton: false,
        });
        this.router.navigate(['/approve-courses']);
        this.getCourseDetails();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  rejectInstructor(id: string) {
    this.dashboardService.updateCourseStatusReject(id, 'reject').subscribe({
      next: () => {
          Swal.fire({
                  icon: 'success',
                  title: 'تم رفض الدورة ❌',
                  timer: 1500,
                  showConfirmButton: false,
                });
                this.router.navigate(['/approve-courses']);
        this.getCourseDetails();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
