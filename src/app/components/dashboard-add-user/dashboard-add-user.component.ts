import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-add-user',
  templateUrl: './dashboard-add-user.component.html',
  styleUrls: ['./dashboard-add-user.component.css']
})
export class DashboardAddUserComponent {
  userForm: FormGroup;
  loading = false;

  roles = ['student', 'instructor', 'admin'];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
      city: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.userForm.invalid) return;

    this.loading = true;

    this.dashboardService.addUser(this.userForm.value)
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          alert(res.message || 'تم إضافة المستخدم بنجاح');
          this.userForm.reset();
        },
        error: (err) => {
          this.loading = false;
          alert(err.error.message || 'حدث خطأ أثناء إضافة المستخدم');
        }
      });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
