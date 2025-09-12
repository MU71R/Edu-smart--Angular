import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  private apiUrl = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/enrollments';

  constructor(private http: HttpClient) {}

  // ✅ اشترك في كورس جديد
  createEnrollment(courseId: string): Observable<Enrollment> {
    return this.http.post<Enrollment>(this.apiUrl, { courseId });
  }

  // ✅ رجع كل الاشتراكات الخاصة بالمستخدم الحالي
  getMyEnrollments(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(this.apiUrl);
  }

  // ✅ تحدّث التقدم Progress
  updateProgress(enrollmentId: string, progress: number): Observable<Enrollment> {
    return this.http.put<Enrollment>(`${this.apiUrl}/${enrollmentId}`, { progress });
  }
  // ✅ complete-lesson
// ✅ تحدّث تقدم درس معين
completeLesson(enrollmentId: string, lessonId: string) {
  return this.http.put(`${this.apiUrl}/${enrollmentId}/complete-lesson`, { lessonId });
  console.log('EnrollmentId:', enrollmentId, 'LessonId:', lessonId);
}

}