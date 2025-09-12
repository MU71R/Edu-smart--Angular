import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from '../models/dashboard';
import { Cours } from '../models/cours';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://edu-smart-pink.vercel.app/dashboard';
  private adminUrl = 'https://edu-smart-pink.vercel.app/admin';

  constructor(private http: HttpClient) {}

  // ===== Dashboard Stats =====
  getStats(): Observable<{ users: number; pendingUsers: number; courses: number; instructors: number; pendingCourses: number; totalSales: number }> {
    return this.http.get<{ users: number; pendingUsers: number; courses: number; instructors: number; pendingCourses: number; totalSales: number }>(`${this.apiUrl}/stats`);
  }

  getRecentActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.apiUrl}/recent-activities`);
  }

  // ===== Notifications =====
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notifications`);
  }

  markNotificationsRead(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/notifications/read`, {});
  }

  clearAll(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/notifications/clear`);
  }

  // إرسال إشعار جديد
  addNotification(
    type: 'user_registered' | 'instructor_pending' | 'instructor_approved' | 'course_pending' | 'course_approved',
    payload: any
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/notifications/add`, { type, payload });
  }

  // ===== Instructors =====
  getPendingInstructors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.adminUrl}/pending-instructors`);
  }

  updateInstructorStatus(id: string, action: 'approve' | 'reject'): Observable<{ message: string }> {
    if (action === 'approve') {
      return this.http.post<{ message: string }>(`${this.adminUrl}/instructors/approve/${id}`, {});
    } else {
      return this.http.post<{ message: string }>(`${this.adminUrl}/instructors/reject/${id}`, {});
    }
  }

  // ===== Courses =====
  getPendingCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.adminUrl}/pending-courses`);
  }

  updateCourseStatus(id: string, action: 'approve' | 'reject'): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.adminUrl}/courses/approve/${id}`, { action });
  }

  updateCourseStatusReject(id: string, action: 'approve' | 'reject'): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.adminUrl}/courses/reject/${id}`, { action });
  }

  // ===== Users =====
  addUser(user: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.adminUrl}/add-user`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.adminUrl}/users`);
  }
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.adminUrl}/users/search?query=${query}`);
  }
  DetailsUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.adminUrl}/users/${id}`);
  }
  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.adminUrl}/users/${id}`);
  }

  getCourses(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.adminUrl}/courses`);
  }

  deleteCourse(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.adminUrl}/courses/${id}`);
  }
}

