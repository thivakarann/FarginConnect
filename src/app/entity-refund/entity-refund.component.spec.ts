import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRefundComponent } from './entity-refund.component';

describe('EntityRefundComponent', () => {
  let component: EntityRefundComponent;
  let fixture: ComponentFixture<EntityRefundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityRefundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityRefundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
