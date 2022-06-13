import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateReorderComponent } from './date-reorder.component';

describe('DateReorderComponent', () => {
  let component: DateReorderComponent;
  let fixture: ComponentFixture<DateReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateReorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
