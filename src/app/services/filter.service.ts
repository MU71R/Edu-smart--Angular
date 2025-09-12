// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoursesService } from './courses.service';
import { Filter } from '../models/filter';
@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<Filter | null>(null);
  private filter: Filter = {};
  constructor(private courseService: CoursesService) {}

  setFilter(filter: Filter) {
    this.filterSubject.next(filter);
  }
  getFilter(): Filter | null {
    return this.filterSubject.value;
  }

  filterChanges(): Observable<Filter | null> {
    return this.filterSubject.asObservable();
  }

  applyFilter(): Observable<any> {
    const filter = this.getFilter();
    if (!filter) {
      throw new Error('No filter set');
    }
    return this.courseService.getFilteredCourses(filter);
  }
}
