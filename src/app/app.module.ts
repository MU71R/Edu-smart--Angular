import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListComponent } from './components/user/quiz-list/quiz-list-component.component';
import { QuizPlayerComponent } from './components/user/quiz-player/quiz-player-component.component';
import { ProgressTrackerComponent } from './components/user/progress-tracker/progress-tracker-component.component';
import { EnrollmentStatusComponent } from './components/user/enrollment-status/enrollment-status-component.component';
import { QuizResultComponent } from './components/user/quiz-result/quiz-result-component.component';
import { ResultHistoryComponent } from './components/user/result-history/result-history-component.component';
import { ReviewFormComponent } from './components/user/review-form/review-form-component.component';
import { ReviewListComponent } from './components/user/review-list/review-list-component.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuizFormComponent } from './components/Instructor/Quiz-form/uiz-form-component.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PackageComponent } from './components/package/package.component';
import { PackageDetailsComponent } from './components/package-details/package-details.component';
import { InstructorStatusComponent } from './components/instructor-status/instructor-status.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardInstructorComponent } from './components/dashboard-instructor/dashboard-instructor.component';
import { DashboardApproveCoursesComponent } from './components/dashboard-approve-courses/dashboard-approve-courses.component';
import { CommonModule } from '@angular/common';
import { DashboardOverviewComponent } from './components/dashboard-overview/dashboard-overview.component';
import { DashboardInstructorDetailComponent } from './components/dashboard-instructor-detail/dashboard-instructor-detail.component';
import { DashboardCourseDetailsComponent } from './components/dashboard-course-details/dashboard-course-details.component';
import { DashboardAddUserComponent } from './components/dashboard-add-user/dashboard-add-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseFilterPipe } from './components/courses-list/course-filter.pipe';
import { MessagesComponent } from './components/massage/massage.component';
import { CourseCreateComponent } from './components/create-course/create-course.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { InstructorDashboardComponent } from './components/instructor-dashboard/instructor-dashboard.component';
import { DashbordUserComponent } from './components/dashbord-user/dashbord-user.component';
import { AuthInterceptor } from './components/interceptors/auth';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CoursesManagementComponent } from './components/courses-management/courses-management.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { CreateLessonComponent } from './components/create-lesson/create-lesson.component';
@NgModule({
  declarations: [
    AppComponent,
    QuizListComponent,
    QuizFormComponent,
    QuizPlayerComponent,
    ProgressTrackerComponent,
    EnrollmentStatusComponent,
    QuizResultComponent,
    ResultHistoryComponent,
    ReviewFormComponent,
    ReviewListComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    HomeComponent,
    CheckoutComponent,
    PaymentSuccessComponent,
    PackageComponent,
    PackageDetailsComponent,
    InstructorStatusComponent,
    DashboardComponent,
    DashboardInstructorComponent,
    DashboardApproveCoursesComponent,
    DashboardOverviewComponent,
    DashboardInstructorDetailComponent,
    DashboardCourseDetailsComponent,
    DashboardAddUserComponent,
    UsersManagementComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    CourseFilterPipe,
    MessagesComponent,
    CourseCreateComponent,
    LessonComponent,
    InstructorDashboardComponent,
    DashbordUserComponent,
    UnauthorizedComponent,
    CoursesManagementComponent,
    ProfileComponent,
    UserDetailsComponent,
    CreateLessonComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor , multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, fab, far);
  }
}
