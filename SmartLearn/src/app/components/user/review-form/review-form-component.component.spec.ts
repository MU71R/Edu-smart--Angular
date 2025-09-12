import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormComponentComponent } from './review-form-component.component';

describe('ReviewFormComponentComponent', () => {
  let component: ReviewFormComponentComponent;
  let fixture: ComponentFixture<ReviewFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewFormComponentComponent]
    });
    fixture = TestBed.createComponent(ReviewFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
