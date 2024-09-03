import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalForBankComponent } from './approval-for-bank.component';

describe('ApprovalForBankComponent', () => {
  let component: ApprovalForBankComponent;
  let fixture: ComponentFixture<ApprovalForBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalForBankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalForBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
