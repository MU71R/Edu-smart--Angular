// instructor-dashboard.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoursesService} from './courses.service';
import { Cours } from '../models/cours';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
// import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorDashboardService {
  private apiUrl2 = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/courses';

  constructor(private coursesService: CoursesService, private http: HttpClient,private authService: AuthService) {}
  instructorId: string = this.authService.decodeToken().id;
  

  // هات كورسات الإنستراكتور
  getInstructorCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl2}/my-courses`);
  }
  deleteCourse(courseId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl2}/delete/${courseId}`);
  }
  // احسب إجمالي عدد الطلاب
  // getTotalStudents(instructorId: string): Observable<number> {
  //   return this.getInstructorCourses(instructorId).pipe(
  //     map((courses: Cours[]) =>
  //       courses.reduce((sum, course) => sum + (course.enrollments.length || 0), 0)
  //     )
  //   );
  // }

  // احسب عدد الكورسات
//   getTotalCourses(instructorId: string): Observable<number> {
//     return this.getInstructorCourses (instructorId,this.instructorId).pipe(
//       map((courses: Cours[]) => courses.length)
//     );
//   }
// }

}
