import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-instructor-status',
  templateUrl: './instructor-status.component.html',
  styleUrls: ['./instructor-status.component.css']
})
export class InstructorStatusComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalStorage();
    if (user?.role?.toLowerCase() === 'instructor' && user.isApproved === true) {
      this.router.navigate(['/instructor-dashboard']); 
    }
  }
}
