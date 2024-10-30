import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKycComponent } from './business-kyc.component';

describe('BusinessKycComponent', () => {
  let component: BusinessKycComponent;
  let fixture: ComponentFixture<BusinessKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessKycComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
