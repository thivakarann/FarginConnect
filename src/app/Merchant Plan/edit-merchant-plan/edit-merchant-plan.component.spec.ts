import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMerchantPlanComponent } from './edit-merchant-plan.component';

describe('EditMerchantPlanComponent', () => {
  let component: EditMerchantPlanComponent;
  let fixture: ComponentFixture<EditMerchantPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMerchantPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMerchantPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
