import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { DashboardService } from 'src/app/services/dashboard.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  users: User[] = [];   
  error: string | null = null;
  searchQuery: string = '';
  searchResults: User[] = [];

  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();

    // الاشتراك على searchSubject
    this.searchSubscription = this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery = query;
      if (query.length > 0) {
        this.dashboardService.searchUsers(query).subscribe({
          next: (res: User[]) => {
            this.searchResults = res;   // حط النتائج في القائمة
          },
          error: () => {
            this.searchResults = [];
          }
        });
      } else {
        this.searchResults = []; // امسح لو مفيش سيرش
      }
    });
  }

  loadUsers() {
    this.loading = true;
    this.error = null;

    this.dashboardService.getUsers().subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Something went wrong, please try again.';
        this.users = [];
        this.loading = false;
      },
    });
  }
  goToDetails(userId: string) {
    this.router.navigate(['/user-details', userId]);
    this.searchResults = []; // امسح القائمة بعد الاختيار
  }
  deleteUser(userId: string) {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    this.loading = true;
    this.dashboardService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== userId);
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Something went wrong, please try again.';
        this.loading = false;
      },
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value.trim());
  }

  searchUsers(query: string) {
    this.loading = true;
    this.error = null;

    this.dashboardService.searchUsers(query).subscribe({
      next: (res: User[]) => {
        this.users = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Something went wrong, please try again.';
        this.users = [];
        this.loading = false;
      }
    });
  }

  ngOnDestroy() {
    // تنظيف الاشتراك
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/overview']);
  }
}
