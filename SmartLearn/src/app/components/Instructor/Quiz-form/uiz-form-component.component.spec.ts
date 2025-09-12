import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UizFormComponentComponent } from './uiz-form-component.component';

describe('UizFormComponentComponent', () => {
  let component: UizFormComponentComponent;
  let fixture: ComponentFixture<UizFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UizFormComponentComponent]
    });
    fixture = TestBed.createComponent(UizFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
