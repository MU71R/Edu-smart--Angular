import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// ==================== Login Guard ====================
export const authLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    const role = user.role?.toLowerCase();

    // وجّه المستخدم حسب دوره
    if (role === 'admin') {
      router.navigate(['/dashboard']);
    } 
    else if (role === 'student') {
      router.navigate(['/dashboard-student']);
    } 
    else if (role === 'instructor') {
      if (user.isApproved === true) {
        router.navigate(['/instructor-dashboard']);
      } else {
        router.navigate(['/unauthorized']);
      }
    } 
    else {
      router.navigate(['/unauthorized']);
    }

    return false; 
  }

  return true; 
};

// ==================== Role Guard ====================
export const authRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  const userData = localStorage.getItem('userData');
  if (!userData) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userData);
  const role = user.role?.toLowerCase();
  const allowedRoles: string[] = (route.data['roles'] || []).map((r: string) => r.toLowerCase());

  // شرط خاص بالإنستركتور
  if (role === 'instructor' && user.isApproved !== true) {
    router.navigate(['/unauthorized']);
    return false;
  }

  if (!allowedRoles.includes(role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
