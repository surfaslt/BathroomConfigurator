import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dynamic3DComponentComponent } from './dynamic3-d-component.component';

describe('Dynamic3DComponentComponent', () => {
  let component: Dynamic3DComponentComponent;
  let fixture: ComponentFixture<Dynamic3DComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dynamic3DComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dynamic3DComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
