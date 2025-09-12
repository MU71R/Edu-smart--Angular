import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder, private profileservice:ProfileService) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }],  // read-only
      city: [''],
      phoneNumber: [''],
      password: [{ value: '', disabled: true }], // read-only
      role: [{ value: '', disabled: true }]      // read-only
    });

    this.loadUserProfile();
  }

  loadUserProfile() {
    this.profileservice.getProfile().subscribe(user => {
      this.profileForm.patchValue(user);
    });
  }

  onSave() {
    const updatedData = {
      name: this.profileForm.get('name')?.value,
      city: this.profileForm.get('city')?.value,
      phoneNumber: this.profileForm.get('phoneNumber')?.value
    };

    this.profileservice.updateProfile(updatedData).subscribe(res => {
      alert('Profile updated successfully!');
     });
   }

}
