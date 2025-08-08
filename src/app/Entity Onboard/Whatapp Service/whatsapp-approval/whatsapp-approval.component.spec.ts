import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappApprovalComponent } from './whatsapp-approval.component';

describe('WhatsappApprovalComponent', () => {
  let component: WhatsappApprovalComponent;
  let fixture: ComponentFixture<WhatsappApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsappApprovalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsappApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
