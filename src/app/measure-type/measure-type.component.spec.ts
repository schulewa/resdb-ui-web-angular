import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureTypeComponent } from './measure-type.component';

describe('MeasureTypeComponent', () => {
  let component: MeasureTypeComponent;
  let fixture: ComponentFixture<MeasureTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeasureTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
