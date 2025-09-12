import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Instructor } from 'src/app/models/instructor';

@Component({
  selector: 'app-dashboard-instructor-detail',
  templateUrl: './dashboard-instructor-detail.component.html',
  styleUrls: ['./dashboard-instructor-detail.component.css']
})
export class DashboardInstructorDetailComponent implements OnInit {
  instructor: Instructor | null = null;
  loading = true;
  actionLoading = false;
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.loadInstructor();
    }
  }

  loadInstructor() {
    this.dashboardService.getPendingInstructors().subscribe({
      next: (instructors: Instructor[]) => {
        this.instructor = instructors.find(i => i._id === this.id) || null;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading instructor', err);
        this.loading = false;
      }
    });
  }

  approveInstructor() {
    if (!this.instructor) return;
    this.actionLoading = true;
    this.dashboardService.updateInstructorStatus(this.instructor._id, 'approve').subscribe({
      next: () => {
        alert('تمت الموافقة على المدرس ✅');
        this.router.navigate(['/dashboard/instructor']);
      },
      error: (err) => {
        console.error(err);
        this.actionLoading = false;
      }
    });
  }

  rejectInstructor() {
    if (!this.instructor) return;
    if (!confirm('هل أنت متأكد من رفض وحذف هذا المدرس؟')) return;
    this.actionLoading = true;
    this.dashboardService.updateInstructorStatus(this.instructor._id, 'reject').subscribe({
      next: () => {
        alert('تم رفض وحذف المدرس ❌');
        this.router.navigate(['/dashboard/instructors']);
      },
      error: (err) => {
        console.error(err);
        this.actionLoading = false;
      }
    });
  }
}
