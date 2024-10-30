import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPlanViewallComponent } from './merchant-plan-viewall.component';

describe('MerchantPlanViewallComponent', () => {
  let component: MerchantPlanViewallComponent;
  let fixture: ComponentFixture<MerchantPlanViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantPlanViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantPlanViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
