import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarknetTrainingCreateComponent } from './darknet-training-create.component';

describe('DarknetTrainingCreateComponent', () => {
  let component: DarknetTrainingCreateComponent;
  let fixture: ComponentFixture<DarknetTrainingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarknetTrainingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarknetTrainingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
