import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantLogoComponent } from './merchant-logo.component';

describe('MerchantLogoComponent', () => {
  let component: MerchantLogoComponent;
  let fixture: ComponentFixture<MerchantLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
