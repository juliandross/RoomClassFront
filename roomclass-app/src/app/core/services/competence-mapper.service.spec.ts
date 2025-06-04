import { TestBed } from '@angular/core/testing';

import { CompetenceMapperService } from './competence-mapper.service';

describe('CompetenceMapperService', () => {
  let service: CompetenceMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenceMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
