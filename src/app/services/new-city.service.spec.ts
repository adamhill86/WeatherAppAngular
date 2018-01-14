import { TestBed, inject } from '@angular/core/testing';

import { NewCityService } from './new-city.service';

describe('NewCityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewCityService]
    });
  });

  it('should be created', inject([NewCityService], (service: NewCityService) => {
    expect(service).toBeTruthy();
  }));
});
