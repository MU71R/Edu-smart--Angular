import { TestBed } from '@angular/core/testing';

import { InstructorDashboardService } from './service-instructor.service';

describe('ServiceInstructorService', () => {
  let service: InstructorDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
