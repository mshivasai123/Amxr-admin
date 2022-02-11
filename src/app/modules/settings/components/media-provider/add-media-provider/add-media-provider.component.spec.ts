import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaProviderComponent } from './add-media-provider.component';

describe('AddMediaProviderComponent', () => {
  let component: AddMediaProviderComponent;
  let fixture: ComponentFixture<AddMediaProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMediaProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMediaProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
