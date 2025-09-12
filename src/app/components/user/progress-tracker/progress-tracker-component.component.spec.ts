import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrackerComponentComponent } from './progress-tracker-component.component';

describe('ProgressTrackerComponentComponent', () => {
  let component: ProgressTrackerComponentComponent;
  let fixture: ComponentFixture<ProgressTrackerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgressTrackerComponentComponent]
    });
    fixture = TestBed.createComponent(ProgressTrackerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
