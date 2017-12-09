import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametersPageComponent } from './parameters-page.component';

describe('ParametersPageComponent', () => {
  let component: ParametersPageComponent;
  let fixture: ComponentFixture<ParametersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
