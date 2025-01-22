import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomerSetupboxComponent } from './editcustomer-setupbox.component';

describe('EditcustomerSetupboxComponent', () => {
  let component: EditcustomerSetupboxComponent;
  let fixture: ComponentFixture<EditcustomerSetupboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcustomerSetupboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcustomerSetupboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
