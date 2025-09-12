import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizzesServiceService {

  private baseUrl = 'https://edu-smart-pink.vercel.app/quizzes'; // رابط السيرفر

  constructor(private http: HttpClient) {}

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.baseUrl);
  }

  getByCourse(courseId: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/course/${courseId}`);
  }

  createQuiz(quiz: Quiz | {lessonId: string, quizId: string}): Observable<Quiz> {
    return this.http.post<Quiz>(this.baseUrl, quiz);
  }

  update(id: string, quiz: Quiz): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.baseUrl}/${id}`, quiz);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
