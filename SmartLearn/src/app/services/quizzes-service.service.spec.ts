import { TestBed } from '@angular/core/testing';

import { QuizzesServiceService } from './quizzes-service.service';

describe('QuizzesServiceService', () => {
  let service: QuizzesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
