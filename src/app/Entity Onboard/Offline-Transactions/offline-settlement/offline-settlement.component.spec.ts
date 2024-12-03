import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineSettlementComponent } from './offline-settlement.component';

describe('OfflineSettlementComponent', () => {
  let component: OfflineSettlementComponent;
  let fixture: ComponentFixture<OfflineSettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflineSettlementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfflineSettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
