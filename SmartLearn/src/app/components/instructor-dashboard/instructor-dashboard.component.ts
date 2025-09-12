import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorDashboardService } from 'src/app/services/service-instructor.service';
import { Cours } from '../../models/cours';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent implements OnInit {
  instructorName: string = 'Instructor';
  instructorId: string;
  totalStudents: number = 0;
  showModal: boolean = false;
  showLessonModal: boolean = false;



  courses: Cours[] = [];

  constructor(
    private authService: AuthService,
    private dashboardService: InstructorDashboardService,
    private router: Router
  ) {
    // لو تحب ممكن تستخرج الـ id هنا من التوكن
    const decoded = this.authService.decodeToken();
    this.instructorId = decoded?.id || '';
  }

  ngOnInit(): void {
    // Subscribe على user$
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.instructorName = user?.name || 'Instructor';
        console.log('Instructor Name:', this.instructorName);
        console.log('Instructor ID:', this.instructorId);
        console.log('User from BehaviorSubject:', user);
      } else {
        this.instructorName = 'Instructor';
      }
    });
    // جلب كورسات الانستراكتور
    this.dashboardService.getInstructorCourses().subscribe({
      next: (data: Cours[]) => {
        this.courses = data;
        console.log('Courses from API:', data);
      },
      error: (err: Error) => {
        console.error('Error fetching instructor courses:', err.message);
      }
    });

    // يمكن تضيف جلب بيانات أخرى هنا حسب الحاجة
  }

  viewCourse(courseId: string): void {
    console.log('View course with ID:', courseId);
    // ممكن تنقل لصفحة الكورس هنا لو حبيت
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    document.body.classList.remove('modal-open');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) modalBackdrop.remove();
  }
  
  // لو عايز تضيف logout
  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
  deleteCourse(courseId: string){
    this.dashboardService.deleteCourse(courseId).subscribe();
  }
  openLessonModal() { this.showLessonModal = true; }
  closeLessonModal() { this.showLessonModal = false; }
}



