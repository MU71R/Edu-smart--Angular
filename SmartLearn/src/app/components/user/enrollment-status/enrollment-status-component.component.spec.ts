import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentStatusComponentComponent } from './enrollment-status-component.component';

describe('EnrollmentStatusComponentComponent', () => {
  let component: EnrollmentStatusComponentComponent;
  let fixture: ComponentFixture<EnrollmentStatusComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollmentStatusComponentComponent]
    });
    fixture = TestBed.createComponent(EnrollmentStatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
