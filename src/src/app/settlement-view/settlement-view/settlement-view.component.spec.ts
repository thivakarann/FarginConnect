import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementViewComponent } from './settlement-view.component';

describe('SettlementViewComponent', () => {
  let component: SettlementViewComponent;
  let fixture: ComponentFixture<SettlementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettlementViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettlementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
