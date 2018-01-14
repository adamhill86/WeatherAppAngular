import { TestBed, inject } from '@angular/core/testing';

import { CreateComponentService } from './create-component.service';

describe('CreateComponentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateComponentService]
    });
  });

  it('should be created', inject([CreateComponentService], (service: CreateComponentService) => {
    expect(service).toBeTruthy();
  }));
});
