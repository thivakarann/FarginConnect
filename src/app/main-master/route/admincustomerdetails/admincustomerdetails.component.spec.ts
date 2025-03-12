import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincustomerdetailsComponent } from './admincustomerdetails.component';

describe('AdmincustomerdetailsComponent', () => {
  let component: AdmincustomerdetailsComponent;
  let fixture: ComponentFixture<AdmincustomerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincustomerdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmincustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
