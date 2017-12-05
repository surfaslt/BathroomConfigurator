import { TestBed, inject } from '@angular/core/testing';

import { SelectionsMadeService } from './selections-made.service';

describe('SelectionsMadeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionsMadeService]
    });
  });

  it('should be created', inject([SelectionsMadeService], (service: SelectionsMadeService) => {
    expect(service).toBeTruthy();
  }));
});
