import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRefundpolicyComponent } from './admin-refundpolicy.component';

describe('AdminRefundpolicyComponent', () => {
  let component: AdminRefundpolicyComponent;
  let fixture: ComponentFixture<AdminRefundpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRefundpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRefundpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
