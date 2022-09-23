import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoCellRendererComponent } from './yes-no-cell-renderer.component';

describe('YesNoCellRendererComponent', () => {
  let component: YesNoCellRendererComponent;
  let fixture: ComponentFixture<YesNoCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
