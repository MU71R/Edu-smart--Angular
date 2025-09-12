import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstructorDetailComponent } from './dashboard-instructor-detail.component';

describe('DashboardInstructorDetailComponent', () => {
  let component: DashboardInstructorDetailComponent;
  let fixture: ComponentFixture<DashboardInstructorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInstructorDetailComponent]
    });
    fixture = TestBed.createComponent(DashboardInstructorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
