import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeityTypeComponent } from './deity-type.component';

describe('DeityTypeComponent', () => {
  let component: DeityTypeComponent;
  let fixture: ComponentFixture<DeityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeityTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
