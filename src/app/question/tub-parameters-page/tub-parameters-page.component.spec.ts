import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TubParametersPageComponent } from './tub-parameters-page.component';

describe('TubParametersComponent', () => {
  let component: TubParametersPageComponent;
  let fixture: ComponentFixture<TubParametersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TubParametersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TubParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
