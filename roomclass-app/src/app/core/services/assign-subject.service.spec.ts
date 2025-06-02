import { TestBed } from '@angular/core/testing';

import { AssignSubjectService } from './assign-subject.service';

describe('AssignSubjectService', () => {
  let service: AssignSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
