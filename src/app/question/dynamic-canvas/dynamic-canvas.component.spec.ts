import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicCanvasComponent } from './dynamic-canvas.component';
import * as THREE from 'three';
import { SelectionsMadeService } from "../../selections-made.service";
import { HelperService } from "../../helper.service";

describe('DynamicCanvasComponent', () => {

  let expected: boolean;
  let notExpected: boolean;

  let component: DynamicCanvasComponent;
  let fixture: ComponentFixture<DynamicCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicCanvasComponent ],
      providers: [ SelectionsMadeService, HelperService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have functions to create cupboards', () => {
    expect(component.createCupboard1).toBeTruthy();
    expect(component.createCupboard2).toBeTruthy();
    expect(component.createCupboard3).toBeTruthy();
  });

  it('should create cupboards', () => {
    let cupboard1:THREE.Object3D = component.createCupboard1();
    expect(typeof cupboard1).toBe('object');

    let cupboard2:THREE.Object3D = component.createCupboard2();
    expect(typeof cupboard2).toBe('object');

    let cupboard3:THREE.Object3D = component.createCupboard3();
    expect(typeof cupboard3).toBe('object');

  });

  it('should create cupboard2 with 400mm width', () => {
    let cupboard1:THREE.Object3D = component.createCupboard1();
    let cupboard1Width: number = component.getWidth(cupboard1);
    expect( cupboard1Width ).toBe(400);
  });

  it('should create cupboard2 with 500mm width', () => {
    let cupboard2:THREE.Object3D = component.createCupboard2();
    let cupboard2Width: number = component.getWidth(cupboard2);
    expect( cupboard2Width ).toBe(500);
  });

  it('should create cupboard3 with 600mm width', () => {
    let cupboard3:THREE.Object3D = component.createCupboard3();
    let cupboard3Width: number = component.getWidth(cupboard3);
    expect( cupboard3Width ).toBe(600);
  });
});

