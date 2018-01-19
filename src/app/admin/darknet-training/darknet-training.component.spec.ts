import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DarknetTrainingComponent } from './darknet-training.component';

describe('DarknetTrainingComponent', () => {
  let component: DarknetTrainingComponent;
  let fixture: ComponentFixture<DarknetTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DarknetTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DarknetTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
