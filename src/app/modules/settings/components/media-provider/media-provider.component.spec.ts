import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaProviderComponent } from './media-provider.component';

describe('MediaProviderComponent', () => {
  let component: MediaProviderComponent;
  let fixture: ComponentFixture<MediaProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
