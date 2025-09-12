import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Activity, Notification } from 'src/app/models/dashboard';
import { Instructor } from 'src/app/models/instructor';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent {
  activeComp = 'overview';

stats = [
  { title: 'students', value: 0, icon: 'fa fa-users', bg: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)' },
  { title: 'instructors', value: 0, icon: 'fa fa-user-tie', bg: 'linear-gradient(135deg, #fc5c7d 0%, #6a82fb 100%)' },
  { title: 'courses', value: 0, icon: 'fa fa-book', bg: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' },
  { title: 'pending courses', value: 0, icon: 'fa fa-clock', bg: 'linear-gradient(135deg, #ffb347 0%, #ffcc33 100%)' },
  { title: 'total sales', value: 0, icon: 'fa fa-money-bill', bg: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)' },
  { title: 'pending instructors', value: 0, icon: 'fa fa-user-clock', bg: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' }
];


  recentActivities: Activity[] = [];
  notifications: Notification[] = [];
  showDropdown = false;
  unreadCount = 0;
  pendingInstructorsCount: number = 0;
  pendingInstructors: number[] = [];
  pendingUsersCount: number = 0;


  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivities();
    this.loadNotifications();
  }

  toggleNotifications() {
    this.showDropdown = !this.showDropdown;
  
    if (this.showDropdown) {
      // تحديث Backend أولاً
      this.dashboardService.markNotificationsRead().subscribe(() => {
        // بعد نجاح العملية، عدّل البيانات محلي
        this.notifications = this.notifications.map(n => ({ ...n, read: true }));
        this.unreadCount = 0;
      });
    }
  }
  clearAll() {
    this.dashboardService.clearAll().subscribe(() => {
      this.notifications = [];
    });
  }
  

  // روابط سريعة
  // ======================
  // جلب البيانات من الخدمة
  // ======================

  loadStats() {
    this.dashboardService.getStats().subscribe((res: { 
      users: number; 
      courses: number; 
      instructors: number; 
      pendingCourses: number; 
      totalSales: number; 
    }) => {
      this.stats[0].value = res.users;
      this.stats[1].value = res.instructors;
      this.stats[2].value = res.courses;
      this.stats[3].value = res.pendingCourses;
      this.stats[4].value = res.totalSales;
    });
  
    // جلب عدد المدرسين المنتظرين
    this.dashboardService.getPendingInstructors().subscribe((res: any[]) => {
      const stat = this.stats.find(s => s.title === 'pending instructors');
      if (stat) {
        stat.value = res.length;
      }
      this.pendingInstructorsCount = res.length;
    });
  }

  loadRecentActivities() {
    this.dashboardService.getRecentActivities().subscribe((res: Activity[]) => {
      this.recentActivities = res;
    });
  }

  loadNotifications() {
    this.dashboardService.getNotifications().subscribe((res: any[]) => {
      this.notifications = res || [];
      this.unreadCount = this.notifications.filter(n => !n.read).length;
    });
  }  
  
  
  
  

  markNotificationsRead() {
    this.dashboardService.markNotificationsRead().subscribe(() => {
      this.notifications.forEach(n => n.read = true);
      this.unreadCount = 0;
    });
  }
  addUser(){
    this.router.navigate(['/add-user']);
  }
  goToUsers(){
    this.router.navigate(['/users-management']);
  }
  goToCourses(){
    this.router.navigate(['/courses-management']);
  }
}