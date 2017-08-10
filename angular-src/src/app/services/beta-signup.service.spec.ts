import { TestBed, inject } from '@angular/core/testing';

import { BetaSignupService } from './beta-signup.service';

describe('BetaSignupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetaSignupService]
    });
  });

  it('should be created', inject([BetaSignupService], (service: BetaSignupService) => {
    expect(service).toBeTruthy();
  }));
});
