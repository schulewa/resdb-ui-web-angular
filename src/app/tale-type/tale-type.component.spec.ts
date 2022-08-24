import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaleTypeComponent } from './tale-type.component';

describe('TaleTypeComponent', () => {
  let component: TaleTypeComponent;
  let fixture: ComponentFixture<TaleTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaleTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
