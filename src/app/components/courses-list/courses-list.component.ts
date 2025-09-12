import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cours } from 'src/app/models/cours';
import { CoursesService } from 'src/app/services/courses.service';
import { Categories } from 'src/app/models/categories';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: Cours[] = [];
  searchText: string = '';
  filters = {
    categoryId: 'all',
    maxPrice: 0,
    searchText: '',
    language: '',    // ضفناها
    free: false
  };

  showFilters: boolean = false;


  Categories = Categories; // Make Categories enum available in template

  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) { }
  isMobile = window.innerWidth < 768; // أقل من md
  ngOnInit(): void {
    this.checkDevice();
    window.addEventListener('resize', () => this.checkDevice());
    this.coursesService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  checkDevice() {
    this.isMobile = window.innerWidth < 768;
  }
  
  resetFilters() {
    this.filters = {
      categoryId: 'all',
      maxPrice: 0,
      searchText: '',
      language: '',
      free: false
    };
  }

  setCategory(categoryId: string) {
    this.filters.categoryId = categoryId;
  }

  setMaxPrice(price: number) {
    this.filters.maxPrice = price;

  }
  goToDetails(id: string) {
    this.router.navigate(['/course-details', id]);
  }
  // زرار تفاصيل أكتر (ممكن تخليه يفتح صفحة أعمق للكورس أو دروسه)
  

//   onLevelChange(event: any) {
//   const value = event.target.value;
//   if (event.target.checked) {
//     // لو اتعلم → ضيف للـ array
//     this.filters.level.push(value);
//   } else {
//     // لو اتشال → احذفه من الـ array
//     this.filters.level = this.filters.level.filter(l => l !== value);
//   }
// }

  
}
