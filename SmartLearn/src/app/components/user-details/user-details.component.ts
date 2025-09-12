import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  loading: boolean = false;
  user: User | null = null;

constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.dashboardService.DetailsUser(userId).subscribe({
      next: (res :User) => {
        this.user = res; // الحل هنا
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });    
  }
  goBack() {
    this.router.navigate(['/users-management']);
  }
}
