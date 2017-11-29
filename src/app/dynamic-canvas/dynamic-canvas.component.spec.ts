import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCanvasComponent } from './dynamic-canvas.component';

describe('DynamicCanvasComponent', () => {
  let component: DynamicCanvasComponent;
  let fixture: ComponentFixture<DynamicCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
