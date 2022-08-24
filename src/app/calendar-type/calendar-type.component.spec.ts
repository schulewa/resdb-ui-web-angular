import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTypeComponent } from './calendar-type.component';

describe('CalendarTypeComponent', () => {
  let component: CalendarTypeComponent;
  let fixture: ComponentFixture<CalendarTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
