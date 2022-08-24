import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractPersonComponent } from './abstract-person.component';

describe('AbstractPersonComponent', () => {
  let component: AbstractPersonComponent;
  let fixture: ComponentFixture<AbstractPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractPersonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbstractPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
