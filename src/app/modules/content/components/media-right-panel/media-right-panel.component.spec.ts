import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaRightPanelComponent } from './media-right-panel.component';

describe('MediaRightPanelComponent', () => {
  let component: MediaRightPanelComponent;
  let fixture: ComponentFixture<MediaRightPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaRightPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
