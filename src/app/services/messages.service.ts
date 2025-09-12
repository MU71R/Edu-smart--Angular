import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'https://edu-smart-pink.vercel.app'; // غيرها لو السيرفر على عنوان مختلف

  constructor(private http: HttpClient) {}

  // جلب كل المحادثات الخاصة بالمستخدم
  getUserConversations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/conversations`);
  }

  // جلب محادثة معينة حسب الـ ID
  getConversationById(conversationId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/conversations/${conversationId}`);
  }

  // جلب كل الرسائل في محادثة
  getMessages(conversationId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/messages/${conversationId}`);
  }

  createConversation(userId1: string, userId2: string) {
    const token = localStorage.getItem('token');
    return this.http.post('http://localhost:3000/conversations', 
      { userId1, userId2 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }
  

  // إرسال رسالة في محادثة موجودة
  sendMessage(conversationId: string, senderId: string, receiverId: string, content: string) {
    const body = {
      conversationId,
      senderId,
      receiverId,
      content
    };
  
    return this.http.post('http://localhost:3000/messages', body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
}
