import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { Enrollment } from 'src/app/models/enrollments';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { EnrollmentsService } from 'src/app/services/enrollment-service.service';
// import { EnrollmentsService } from 'src/app/services/enrollments.service';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord-user.component.html',
  styleUrls: ['./dashbord-user.component.css'],
})
export class DashbordUserComponent {
  studentName?: string = 'Student';

  stats = {
    enrolled: 3,
    completed: 1,
    hours: 135,
    certificates: 1,
  };
  

  enrollments: Enrollment[] = []; // هنا هنخزن كل الاشتراكات

  constructor(
    private enrollmentsService: EnrollmentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // بدل localStorage -> subscribe على BehaviorSubject
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.studentName = user?.name; // ✅ fallback
        console.log('Student Name:', this.studentName);

        console.log('User from BehaviorSubject:', user);
      } else {
        this.studentName = 'Student';
      }
    });

    // أول ما الكومبوننت يشتغل، يجيب الاشتراكات من السيرفز
    this.enrollmentsService.getMyEnrollments().subscribe({
      next: (data) => {
        this.enrollments = data;
        console.log('My enrollments:', this.enrollments);
        this.stats.enrolled = this.enrollments.length;
        
        // this.stats.completed = this.enrollments.filter(e => (e.progress || 0) === 100).length;
        // this.stats.hours = this.enrollments.reduce((sum, e) => sum + (e.hours || 0), 0); // لو عندك hours لكل كورس
        // this.stats.certificates = this.enrollments.filter(e => (e.progress || 0) === 100).length;
      },
      error: (err) => {
        console.error('Error fetching enrollments:', err);
      },
    });
  }
  messageInstructor(instructorId?: string) {
    if (!instructorId) {
      console.error("Instructor ID not found for this course");
      return;
    }
  
    console.log("Navigating to messages with instructor:", instructorId);
  
    this.router.navigate(['/massages'], {
      queryParams: { instructorId }
    });
  }
  
  goTolesson(courseId?: string) {
    if (courseId) {
      console.log('CourseId:', courseId);
      this.router.navigate(['/lesson', courseId]);
    }
    
  }
  
}
