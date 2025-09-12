import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizPlayerComponentComponent } from './quiz-player-component.component';

describe('QuizPlayerComponentComponent', () => {
  let component: QuizPlayerComponentComponent;
  let fixture: ComponentFixture<QuizPlayerComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizPlayerComponentComponent]
    });
    fixture = TestBed.createComponent(QuizPlayerComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
