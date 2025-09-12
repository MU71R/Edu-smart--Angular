import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListComponentComponent } from './quiz-list-component.component';

describe('QuizListComponentComponent', () => {
  let component: QuizListComponentComponent;
  let fixture: ComponentFixture<QuizListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizListComponentComponent]
    });
    fixture = TestBed.createComponent(QuizListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
