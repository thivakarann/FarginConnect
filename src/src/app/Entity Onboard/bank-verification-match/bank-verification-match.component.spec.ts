import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankVerificationMatchComponent } from './bank-verification-match.component';

describe('BankVerificationMatchComponent', () => {
  let component: BankVerificationMatchComponent;
  let fixture: ComponentFixture<BankVerificationMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankVerificationMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankVerificationMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
