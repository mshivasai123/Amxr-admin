import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscribersComponent } from './add-subscribers.component';

describe('AddSubscribersComponent', () => {
  let component: AddSubscribersComponent;
  let fixture: ComponentFixture<AddSubscribersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscribersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubscribersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
