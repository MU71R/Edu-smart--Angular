import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userKey = 'userData';
  private readonly tokenKey = 'token';
  private apiUrl = 'https://edu-smart-pink.vercel.app/user';
  private userBehaviorSubject = new BehaviorSubject<User | null>(
    this.getUserFromLocalStorage()
  );
  user$ = this.userBehaviorSubject.asObservable();

  // 🔹 الحالة الجديدة لمتابعة تسجيل الدخول
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem(this.tokenKey));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    // عند تشغيل الخدمة، لو فيه يوزر محفوظ نزلو تاني
    const savedUser = this.getUserFromLocalStorage();
    if (savedUser) {
      this.userBehaviorSubject.next(savedUser);
      this.loggedIn.next(true);
    }
  }

  // ✅ Get User safely from localStorage
  getUserFromLocalStorage(): User | null {
    const userDataStr = localStorage.getItem(this.userKey);

    if (!userDataStr || userDataStr === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(userDataStr);
    } catch (error) {
      console.error('❌ Error parsing user data from localStorage:', error);
      return null;
    }
  }

  // ✅ Save user
  setUser(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userBehaviorSubject.next(user);
    this.loggedIn.next(true); // 🔹 حدث حالة تسجيل الدخول
  }

  // ✅ Get Token
  getTokenFromLocalStorage(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Decode token
  decodeToken(): any {
    const token = this.getTokenFromLocalStorage();
    if (token) {
      try {
        const decoded = jwtDecode<any>(token);
        console.log('Decoded Token:', decoded);
        return decoded;
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }

  // ✅ Register
  register(user: FormData) {
    return this.http.post<User>(`${this.apiUrl}/register`, {
      name: user.get('name')!,
      email: user.get('email')!,
      password: user.get('password')!,
      phonenumber: user.get('phonenumber')!,
      city: user.get('city')!,
      role: user.get('role')!,
      certificateURL: user.get('certificateURL'),
    }).pipe(
      tap((response: any) => {
        console.log('✅ Register success:', response);
        this.userBehaviorSubject.next(response);
        localStorage.setItem(this.userKey, JSON.stringify(response));
        this.loggedIn.next(true); // 🔹 بمجرد التسجيل يبقى Logged in
      })
    );
  }

  // ✅ Login
// AuthService
login(credentials: { email: string; password: string }) {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
    tap((response: any) => {
      // debugger;
      const userData = response.user;
      console.log(userData);
      
      this.userBehaviorSubject.next(userData);
      console.log(this.userBehaviorSubject.value);

      localStorage.setItem(this.userKey, JSON.stringify(userData));
      localStorage.setItem(this.tokenKey, response.token);
      this.loggedIn.next(true);
      console.log('✅ Logged in user:', userData);
    }),
    catchError((err) => {
      console.error('❌ Error in login API:', err);
      return throwError(() => err);
    })
  );
}

  forgetPassword(data: { email: string }) {
    return this.http.post(`${this.apiUrl}/forget-password`, data);
  
  }
  // إعادة تعيين كلمة المرور باستخدام OTP
  resetPassword(data: { email: string, otp: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);

  }
  // ✅ Logout
  logout() {
    this.userBehaviorSubject.next(null);
    this.loggedIn.next(false); // 🔹 حدث حالة تسجيل الخروج
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }

  isAdmin(): boolean {
    const user = this.userBehaviorSubject.value;
    return user?.role === 'admin';
  }
  
}
