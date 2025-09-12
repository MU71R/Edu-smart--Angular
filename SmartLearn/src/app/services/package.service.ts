import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/courses';

  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/get-package/${id}`);
  }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/get-all-packages`);
  }
}
