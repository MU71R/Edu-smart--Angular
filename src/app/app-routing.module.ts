import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CourseDetailsComponent } from "./components/course-details/course-details.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { PaymentSuccessComponent } from "./components/payment-success/payment-success.component";
import { PackageComponent } from "./components/package/package.component";
import { PackageDetailsComponent } from "./components/package-details/package-details.component";
import { InstructorStatusComponent } from "./components/instructor-status/instructor-status.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { DashboardInstructorComponent } from "./components/dashboard-instructor/dashboard-instructor.component";
import { DashboardApproveCoursesComponent } from "./components/dashboard-approve-courses/dashboard-approve-courses.component";
import { DashboardOverviewComponent } from "./components/dashboard-overview/dashboard-overview.component";
import { DashboardInstructorDetailComponent } from "./components/dashboard-instructor-detail/dashboard-instructor-detail.component";
import { DashboardCourseDetailsComponent } from "./components/dashboard-course-details/dashboard-course-details.component";
import { DashboardAddUserComponent } from "./components/dashboard-add-user/dashboard-add-user.component";
import { UsersManagementComponent } from "./components/users-management/users-management.component";
import { CoursesListComponent } from "./components/courses-list/courses-list.component";
import { MessagesComponent } from "./components/massage/massage.component";
import { CourseCreateComponent } from "./components/create-course/create-course.component";
import { LessonComponent } from "./components/lesson/lesson.component";
import { InstructorDashboardComponent } from "./components/instructor-dashboard/instructor-dashboard.component";
import { DashbordUserComponent } from "./components/dashbord-user/dashbord-user.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { CoursesManagementComponent } from "./components/courses-management/courses-management.component";
import { UserDetailsComponent } from "./components/user-details/user-details.component";
import { UnauthorizedComponent } from "./components/unauthorized/unauthorized.component";
import { authLoginGuard, authRoleGuard } from "./guard/user/student-guard.guard";
import { CreateLessonComponent } from "./components/create-lesson/create-lesson.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "courses-list", component: CoursesListComponent },
  { path: "course-details/:id", component: CourseDetailsComponent },  
  // صفحات الطلاب
  {
    path: "checkout/:id",
    component: CheckoutComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: "payment-success",
    component: PaymentSuccessComponent,
  },
  {
    path: "dashboard-student",
    component: DashbordUserComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: "courses-management",
    component: CoursesManagementComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },

  // صفحات المدرسين
  {
    path: "create-course",
    component: CourseCreateComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['instructor'] }
  },
  {
    path: "lesson/:id",
    component: LessonComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['student'] }
  },
  {
    path: "instructor-dashboard",
    component: InstructorDashboardComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['instructor'] }
  },
  {
    path: "create-lesson/:id",
    component: CreateLessonComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['instructor'] }
  },

  // صفحات المسؤولين (Admin)
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      { path: "overview", component: DashboardOverviewComponent },
      { path: "instructor", component: DashboardInstructorComponent },
      { path: "approve-courses", component: DashboardApproveCoursesComponent }
    ]
  },
  {
    path: "instructor-detail/:id",
    component: DashboardInstructorDetailComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: "course-approve/:id",
    component: DashboardCourseDetailsComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: "add-user",
    component: DashboardAddUserComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: "users-management",
    component: UsersManagementComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: "user-details/:id",
    component: UserDetailsComponent,
    canActivate: [authRoleGuard],
    data: { roles: ['admin'] }
  },

  // صفحات عامة
  { path: "packages", component: PackageComponent },
  { path: "package-details/:id", component: PackageDetailsComponent },
  { path: "instructor-status", component: InstructorStatusComponent },
  { path: "massages/:conversationId", component: MessagesComponent },
  { path: "massages", component: MessagesComponent },
  { path: "profile", component: ProfileComponent },

  // تسجيل الدخول / التسجيل
  { path: "login", component: LoginComponent, canActivate: [authLoginGuard] },
  { path: "register", component: RegisterComponent, canActivate: [authLoginGuard] },

  // صفحة غير مصرح بها
  { path: "unauthorized", component: UnauthorizedComponent, canActivate: [authLoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
