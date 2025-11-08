import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinesettlementPayoutComponent } from './offlinesettlement-payout.component';

describe('OfflinesettlementPayoutComponent', () => {
  let component: OfflinesettlementPayoutComponent;
  let fixture: ComponentFixture<OfflinesettlementPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflinesettlementPayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfflinesettlementPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
