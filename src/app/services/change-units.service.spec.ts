import { TestBed, inject } from '@angular/core/testing';

import { ChangeUnitsService } from './change-units.service';

describe('ChangeUnitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeUnitsService]
    });
  });

  it('should be created', inject([ChangeUnitsService], (service: ChangeUnitsService) => {
    expect(service).toBeTruthy();
  }));
});
