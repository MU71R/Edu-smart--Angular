import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Cours } from '../../models/cours';
import { faArrowRight, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  popularCourses: Cours[] = [];
  faArrowRight = faArrowRight;
  video = faVideo;
  loading: boolean = true;
  error: boolean = false;

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (res) => {
        this.popularCourses = res.slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
        this.loading = false;
        this.error = true;
      },
    });
  }
  
  getCourseById(id: string) {
    this.courseService.getCourseById(id);
    this.router.navigate(['/course-details', id]);
  }
    // Categories
    categories = [
      { name: 'Web Development', courses: 156, icon: 'fa fa-code' },
      { name: 'Design', courses: 89, icon: 'fa fa-paint-brush' },
      { name: 'Database', courses: 74, icon: 'fa fa-database' },
      { name: 'AI & ML', courses: 52, icon: 'fa fa-brain' },
      { name: 'Photography', courses: 38, icon: 'fa fa-camera' },
    ];
  
    // Features
    features = [
      { icon: 'fa fa-brain', title: 'AI-Powered Learning', desc: 'Personalized recommendations based on learning style and goals' },
      { icon: 'fa fa-book', title: 'Structured Paths', desc: 'Follow curated learning paths to achieve your career goals' },
      { icon: 'fa fa-language', title: 'Arabic Content', desc: 'Native Arabic content and RTL support for learners' },
      { icon: 'fa fa-certificate', title: 'Certificates', desc: 'Earn industry-recognized certificates upon course completion' }
    ];
  }  

