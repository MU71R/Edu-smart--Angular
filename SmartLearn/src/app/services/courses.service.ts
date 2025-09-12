import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cours } from '../models/cours';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/courses'; 

  constructor(private http: HttpClient) {}

  // تجيب كل الكورسات
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      map((items) => items.filter(item => item.type === 'course'))
    );
  }

  // تجيب كل الباكدجات
  getPackages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`).pipe(
      map((items) => items.filter(item => item.type === 'package'))
    );
  }

  getPackageById(id: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.baseUrl}/get/${id}`);
  }

  getCourseById(id: string): Observable<Cours> {
    return this.http.get<Cours>(`${this.baseUrl}/get/${id}`);
  }

  // إنشاء كورس جديد
  createCourse(course: FormData): Observable<Cours> {
    return this.http.post<Cours>(`${this.baseUrl}/create`, course);
  }
}
