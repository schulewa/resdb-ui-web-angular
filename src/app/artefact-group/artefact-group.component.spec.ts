import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtefactGroupComponent } from './artefact-group.component';

describe('ArtefactGroupComponent', () => {
  let component: ArtefactGroupComponent;
  let fixture: ComponentFixture<ArtefactGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtefactGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtefactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
