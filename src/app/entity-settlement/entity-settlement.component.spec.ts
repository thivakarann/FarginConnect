import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySettlementComponent } from './entity-settlement.component';

describe('EntitySettlementComponent', () => {
  let component: EntitySettlementComponent;
  let fixture: ComponentFixture<EntitySettlementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySettlementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntitySettlementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
