import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLanguagesComponent } from './manage-languages.component';

describe('ManageLanguagesComponent', () => {
  let component: ManageLanguagesComponent;
  let fixture: ComponentFixture<ManageLanguagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLanguagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLanguagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
