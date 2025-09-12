import { Pipe, PipeTransform } from '@angular/core';
import { Cours } from 'src/app/models/cours';

@Pipe({
  name: 'courseFilter',
  pure: false
})
export class CourseFilterPipe implements PipeTransform {
  transform(courses: Cours[], searchText: string = '', filters: any = {}): Cours[] {
    if (!courses) return [];

    let filtered = [...courses];
console.log('mom');

    // فلترة بالبحث (الاسم أو الديسكر)
    if (searchText && searchText.trim() !== '') {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchText.toLowerCase()) ||
        course.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }

      //  debugger
if (filters.categoryId && filters.categoryId !== 'all') {
  const filteredData = filtered.filter(course => course.categoryID == (filters.categoryId));
  console.log('Filtered by category:', filteredData);

//    debugger
// if (filters.categoryId && filters.categoryId !== 'all') {
//   const filteredData = filtered.filter(course => course.categoryId == (filters.categoryId));
//   console.log('Filtered by category:', filteredData);
  

  filtered = filteredData;
}

    // فلترة حسب السعر الأدنى)
    if (filters.maxPrice && filters.maxPrice > 0) {
      filtered = filtered.filter(course => course.price <= filters.maxPrice);
    }
    

    return filtered;
  }
}
