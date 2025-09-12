// src/app/services/payment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/payments'; // عنوان الباكند

  constructor(private http: HttpClient) {}

  createOrder(data: { 
    userId: string; 
    itemId: string;   // courseId أو packageId 
    itemType: 'course' | 'package'; 
    amount: number; 
    shippingAddress?: any;
  }): Observable<{ orderID: string; approvalUrl: string }> {
    return this.http.post<{ orderID: string; approvalUrl: string }>(
      `${this.apiUrl}/create-order`,
      data
    );
  }
  

  captureOrder(orderID: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/capture-order`, { params: { orderID } });
  }
}
