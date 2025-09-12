import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHistoryComponentComponent } from './result-history-component.component';

describe('ResultHistoryComponentComponent', () => {
  let component: ResultHistoryComponentComponent;
  let fixture: ComponentFixture<ResultHistoryComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultHistoryComponentComponent]
    });
    fixture = TestBed.createComponent(ResultHistoryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
