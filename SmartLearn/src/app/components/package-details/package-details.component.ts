import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from 'src/app/models/package';
import { AuthService } from 'src/app/services/auth.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.css']
})
export class PackageDetailsComponent {
  package: Package | null = null;
  loading = false;
  error: string | null = null;
  isEnrolled: boolean = false;
  enrolling: boolean = false;
  activeTab: string = 'overview';

  constructor(
    private packageService: PackageService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
 
    this.loadPackageDetails();
  }

  loadPackageDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.packageService.getPackageById(id).subscribe({
        next: (pkg) => {
          this.package = pkg;
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load package details:', err);
          this.error = err.message || 'Failed to load package details';
          this.loading = false;
        }
      });
    }
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  startCourse(courseId: string) {
    console.log('Start course', courseId);
  }

  enroll() {
    this.enrolling = true;
    this.isEnrolled = true;
    console.log('Enrolling user in package', this.package?._id);
    this.router.navigate(['/checkout', this.package?._id], { queryParams: { type: 'package' } });

    setTimeout(() => this.enrolling = false, 2000);
  }

  completedCoursesCount(): number {
    return this.package?.coursesCompleted || 0;
  }
}
