import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffileSettlementPayoutComponent } from './offile-settlement-payout.component';

describe('OffileSettlementPayoutComponent', () => {
  let component: OffileSettlementPayoutComponent;
  let fixture: ComponentFixture<OffileSettlementPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OffileSettlementPayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffileSettlementPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
