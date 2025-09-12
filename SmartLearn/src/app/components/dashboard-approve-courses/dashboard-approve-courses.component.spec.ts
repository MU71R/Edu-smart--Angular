import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardApproveCoursesComponent } from './dashboard-approve-courses.component';

describe('DashboardApproveCoursesComponent', () => {
  let component: DashboardApproveCoursesComponent;
  let fixture: ComponentFixture<DashboardApproveCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardApproveCoursesComponent]
    });
    fixture = TestBed.createComponent(DashboardApproveCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
