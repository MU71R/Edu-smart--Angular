import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    role: '',
    phonenumber: '',
    city: '',
    certificateURL: '',
  };
  showRoleModal = false;
  isLoading = false;
  selectedFile: File | null = null;
  completedFields: Set<string> = new Set();

  constructor(private authService: AuthService, private router: Router) {}

  onBlur(field: string) {
    if ((this.formData as any)[field]) {
      this.completedFields.add(field);
    }
  }

  editField(field: string) {
    this.completedFields.delete(field);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submitRegister() {
    this.isLoading = true;

    // استخدام FormData للرفع مع الملف
    const formDataToSend = new FormData();
    formDataToSend.append('name', this.formData.name);
    formDataToSend.append('email', this.formData.email);
    formDataToSend.append('password', this.formData.password);
    formDataToSend.append('role', this.formData.role);
    formDataToSend.append('phonenumber', this.formData.phonenumber);
    formDataToSend.append('city', this.formData.city);
    if (this.selectedFile && this.formData.role === 'instructor') {
      formDataToSend.append('certificate', this.selectedFile);
    }

    this.authService.register(formDataToSend).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Register successful!',
          timer: 2000,
          showConfirmButton: false,
        });

        const user = res.user;
        if (user.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else if (user.role === 'instructor') {
          if (user.isApproved) {
            this.router.navigate(['/instructor']);
          } else {
            this.router.navigate(['/instructor-status']);
          }
        } else {
          this.router.navigate(['/dashboard-student']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Registration failed!',
          text: err?.error?.message || 'Something went wrong, please try again.',
        });
      }
    });
  }

  openRoleModal() {
    this.showRoleModal = true;
  }

  closeRoleModal() {
    this.showRoleModal = false;
  }

  selectRole(role: string) {
    this.formData.role = role;
    this.closeRoleModal();
  }
}
