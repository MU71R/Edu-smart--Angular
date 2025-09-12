import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorStatusComponent } from './instructor-status.component';

describe('InstructorStatusComponent', () => {
  let component: InstructorStatusComponent;
  let fixture: ComponentFixture<InstructorStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorStatusComponent]
    });
    fixture = TestBed.createComponent(InstructorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
