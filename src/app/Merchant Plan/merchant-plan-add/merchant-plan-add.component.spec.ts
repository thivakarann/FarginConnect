import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPlanAddComponent } from './merchant-plan-add.component';

describe('MerchantPlanAddComponent', () => {
  let component: MerchantPlanAddComponent;
  let fixture: ComponentFixture<MerchantPlanAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantPlanAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantPlanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
