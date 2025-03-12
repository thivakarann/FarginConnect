import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPincodeComponent } from './edit-pincode.component';

describe('EditPincodeComponent', () => {
  let component: EditPincodeComponent;
  let fixture: ComponentFixture<EditPincodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPincodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPincodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
