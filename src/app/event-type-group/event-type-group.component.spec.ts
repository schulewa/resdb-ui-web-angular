import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTypeGroupComponent } from './event-type-group.component';

describe('EventTypeGroupComponent', () => {
  let component: EventTypeGroupComponent;
  let fixture: ComponentFixture<EventTypeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventTypeGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventTypeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
