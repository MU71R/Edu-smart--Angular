import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  // Forms
  form: FormGroup;
  forgotForm: FormGroup;
  resetForm: FormGroup;

  // Flags
  showForget = false;
  showReset = false;

  // Messages
  forgetSuccess = '';
  forgetError = '';
  resetSuccess = '';
  resetError = '';
  errorMessage = '';
  showPassword = false;

  emailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,})+$/;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activeroute: ActivatedRoute
  ) {
    // Login Form
    this.form = this.fb.group({
      emailvar: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
      passwordvar: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]],
    });

    // Forgot Password Form
    this.forgotForm = this.fb.group({
      emailvar: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]]
    });

    // Reset Password Form
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // Validator to match passwords
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  // Login
  onSubmit() {    
    if (this.form.valid) {
      const loginData = {
        email: this.form.value.emailvar,
        password: this.form.value.passwordvar,
      };
      console.log(loginData);
      
      this.authService.login(loginData).subscribe({
        next: (res: any) => {
          if (res.token) {
            // 3️ اعمل decode للـ token
            const decoded = this.authService.decodeToken();
            const role = decoded?.role;
          
            // 4️ وجّه حسب الدور
            if (role === 'student') this.router.navigate(['/dashboard-student']);
            else if (role === 'instructor') this.router.navigate(['/instructor-dashboard']);
            else if (role === 'admin') this.router.navigate(['/dashboard']);
            else this.router.navigate(['/home']);
          } else {
            this.errorMessage = 'Token not found in response';
          }          
        },
        error: (err: any) => {
          this.errorMessage = err.error.message || 'Error logging in';
        }
      });
    }
  }

  // Forgot Password
  onForgotPassword() {
    if (this.forgotForm.valid) {
      const data = this.forgotForm.value;
      this.authService.forgetPassword({ email: data.emailvar }).subscribe({
        next: (res: any) => {
          this.forgetSuccess = res.message;
          this.showReset = true;
          this.showForget = false;
          this.resetForm.patchValue({ email: data.emailvar });
        },
        error: (err: any) => {
          this.forgetError = err.error.message || 'Error sending reset link';
        },
      });
    }
  }

  // Reset Password
  onResetPassword() {
    if (this.resetForm.valid) {
      const data = {
        email: this.resetForm.value.email,
        otp: this.resetForm.value.otp,
        password: this.resetForm.value.newPassword,
        confirmPassword: this.resetForm.value.confirmPassword
      };

      this.authService.resetPassword(data).subscribe({
        next: (res: any) => {
          this.resetSuccess = res.message;
          this.showReset = false;
        },
        error: (err: any) => {
          this.resetError = err.error.message || 'Error resetting password';
        }
      });
    } else {
      this.resetError = 'Passwords do not match or form is invalid';
    }
  }

  toggleForgetPassword() {
    this.showForget = !this.showForget;
    this.errorMessage = '';
    this.forgetError = '';
    this.forgetSuccess = '';
  }

  // Getters
  get email() { return this.form.get('emailvar'); }
  get password() { return this.form.get('passwordvar'); }
  get forgetEmailControl() { return this.forgotForm.get('emailvar'); }
  get newPassword() { return this.resetForm.get('newPassword'); }
}
