import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycApprovalComponent } from './kyc-approval.component';

describe('KycApprovalComponent', () => {
  let component: KycApprovalComponent;
  let fixture: ComponentFixture<KycApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
