import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { Cours } from 'src/app/models/cours';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course!: Cours;
  courseId!: string;

  constructor(
    private courseService: CoursesService,
    private route : ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.courseService.getCourseById(id).subscribe((Cours) => {
          this.course = Cours;
        });
      } else {
        console.error('No course ID provided in route!');
      }
    });
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.courseService.getCourseById(this.courseId).subscribe((course) => {
      this.course = course;
    });
  }

  // زرار الرجوع
  goBack() {
    this.router.navigate(['/courses-list']);
  }

  // زرار الذهاب للـ Checkout
  goToCheckout() {
    this.router.navigate(['/checkout', this.course._id]);
  }

 
}
