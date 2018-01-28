import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubParametersComponent } from './tub-parameters-page.component';

describe('TubParametersComponent', () => {
  let component: TubParametersComponent;
  let fixture: ComponentFixture<TubParametersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubParametersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
