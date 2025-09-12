import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCourseDetailsComponent } from './dashboard-course-details.component';

describe('DashboardCourseDetailsComponent', () => {
  let component: DashboardCourseDetailsComponent;
  let fixture: ComponentFixture<DashboardCourseDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCourseDetailsComponent]
    });
    fixture = TestBed.createComponent(DashboardCourseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
