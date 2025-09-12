import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultComponentComponent } from './quiz-result-component.component';

describe('QuizResultComponentComponent', () => {
  let component: QuizResultComponentComponent;
  let fixture: ComponentFixture<QuizResultComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizResultComponentComponent]
    });
    fixture = TestBed.createComponent(QuizResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
