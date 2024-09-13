import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwithdrawalComponent } from './addwithdrawal.component';

describe('AddwithdrawalComponent', () => {
  let component: AddwithdrawalComponent;
  let fixture: ComponentFixture<AddwithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddwithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
