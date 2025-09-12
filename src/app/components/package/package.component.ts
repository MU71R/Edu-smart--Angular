import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from 'src/app/models/package';
import { AuthService } from 'src/app/services/auth.service';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent {
  packages: Package[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private packageService: PackageService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages() {
    this.loading = true;
    this.packageService.getAllPackages().subscribe({
      next: (packages) => {
        this.packages = packages;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load packages';
        this.loading = false;
      }
    });
  }
  viewDetails(pkg: Package) {
    this.router.navigate(['/package-details', pkg._id]);
  }
}
