import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Package } from '../models/package';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://edu-smart-a95n7si7w-mustafa-osamas-projects.vercel.app/courses';

  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/get-package/${id}`);
  }

  getAllPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/get-all-packages`);
  }
}
