import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTestUsersComponent } from './manage-test-users.component';

describe('ManageTestUsersComponent', () => {
  let component: ManageTestUsersComponent;
  let fixture: ComponentFixture<ManageTestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTestUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
