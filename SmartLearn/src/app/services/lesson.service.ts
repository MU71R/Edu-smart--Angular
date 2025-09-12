import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.lessonsSubject.asObservable();

  private apiUrl = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/lessons';

  constructor(private http: HttpClient) {}


  getLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(this.apiUrl).pipe(
      tap((lessons:Lesson[]) => this.lessonsSubject.next(lessons))
    );
  }

   // تجيب الدروس الخاصة بكورس معين
  getLessonsByCourseId(courseId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`);
  }

  // create lesson
  createLesson(lesson:Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(this.apiUrl, lesson);
  }
}