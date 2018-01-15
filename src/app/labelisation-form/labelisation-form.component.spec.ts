import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelisationFormComponent } from './labelisation-form.component';

describe('LabelisationFormComponent', () => {
  let component: LabelisationFormComponent;
  let fixture: ComponentFixture<LabelisationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelisationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
