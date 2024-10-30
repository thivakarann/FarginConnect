import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKycCreateComponent } from './business-kyc-create.component';

describe('BusinessKycCreateComponent', () => {
  let component: BusinessKycCreateComponent;
  let fixture: ComponentFixture<BusinessKycCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessKycCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessKycCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
