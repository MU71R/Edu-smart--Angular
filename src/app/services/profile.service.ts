import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private userBehaviorSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );
  user$ = this.userBehaviorSubject.asObservable();

  private readonly userKey = 'userData';
  private readonly tokenKey = 'token';

  constructor(private http: HttpClient) {
    // عشان مهما اعمل ريفرش الداتا مش تتمسح عشان كده بحطها فى الكنستركتور
    // عند تشغيل الخدمة نحاول نجيب اليوزر من الـ localStorage
    const savedUser = this.getUserFromLocalStorage();
    if (savedUser) {
      this.userBehaviorSubject.next(savedUser);
    }
  }
  //عشان مهما اعمل ريفرش الداتا مش تتمسح
  // Get User from localStorage
  getUserFromLocalStorage(): User | null {
    const userDataStr = localStorage.getItem(this.userKey);
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    return null;
  }

  //عشان احفظ الداتا

  setUser(user: User) {
  localStorage.setItem(this.userKey, JSON.stringify(user));
  this.userBehaviorSubject.next(user);
}

  // Get Token from localStorage
  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Decode token
decodeToken(): any {
  const token = this.getTokenFromLocalStorage();
  if (token) {
    try {
      const decoded = jwtDecode<any>(token);   // decode التوكن
      console.log("Decoded Token: ", decoded); // 👈 هيظهر في الكونسول
      return decoded;                          // رجعيه عشان تستخدميه
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
  return null;
}

getProfile() {
  return this.http.get<User>('https://edu-smart-pink.vercel.app/user/profile').pipe(
    tap((response: any) => {
      console.log('✅ Profile data:', response);
      // ممكن تخزني البيانات في BehaviorSubject عشان تبقي متاحة لكل الصفحات
      this.userBehaviorSubject.next(response);
      localStorage.setItem(this.userKey, JSON.stringify(response));
    })
  );
}

updateProfile(user: Partial<User>) {
  return this.http.put<{ message: string; user: User }>(
    'https://edu-smart-pink.vercel.app/user/update',
    user
  ).pipe(
    tap((response) => {
      console.log('✅ Update success:', response);
      this.userBehaviorSubject.next(response.user);
      localStorage.setItem(this.userKey, JSON.stringify(response.user));
    })
  );
}
changePassword(currentPassword: string, newPassword: string) {
  return this.http.put<any>('https://edu-smart-pink.vercel.app/user/changePassword', {
    currentPassword,
    newPassword
  }).pipe(
    tap((response: any) => {
      console.log('✅ Password changed:', response);
    })
  );
}


}
