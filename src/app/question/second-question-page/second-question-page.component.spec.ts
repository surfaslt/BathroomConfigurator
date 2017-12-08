import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondQuestionPageComponent } from './second-question-page.component';

describe('SecondQuestionPageComponent', () => {
  let component: SecondQuestionPageComponent;
  let fixture: ComponentFixture<SecondQuestionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondQuestionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondQuestionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
