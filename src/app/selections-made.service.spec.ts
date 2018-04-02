import { TestBed, inject } from '@angular/core/testing';

import { SelectionsMadeService } from './selections-made.service';

xdescribe("SelectionsMadeService", () => {

  it("it should pass without any issues", () => {
    let a = 12;
    expect(a).toBe(12);
  });

  it("it should not pass as the values are undefined", () => {
    let u;
    expect(u).toBeDefined('u was not defined, so this test FAILED');
  });

  it("without any expectation.", () => {

  });

});
/*
describe('SelectionsMadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectionsMadeService]
    });
  });

  it('should be created', inject([SelectionsMadeService], (service: SelectionsMadeService) => {
    expect(service).toBeTruthy();
  }));
});
*/
