import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyTypeGroupComponent } from './technology-type-group.component';

describe('TechnologyTypeGroupComponent', () => {
  let component: TechnologyTypeGroupComponent;
  let fixture: ComponentFixture<TechnologyTypeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyTypeGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyTypeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
