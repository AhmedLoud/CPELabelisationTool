import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarknetTrainingDetailComponent } from './darknet-training-detail.component';

describe('TrainingDetailComponent', () => {
  let component: DarknetTrainingDetailComponent;
  let fixture: ComponentFixture<DarknetTrainingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarknetTrainingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarknetTrainingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
