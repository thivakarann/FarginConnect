import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessKycEditComponent } from './business-kyc-edit.component';

describe('BusinessKycEditComponent', () => {
  let component: BusinessKycEditComponent;
  let fixture: ComponentFixture<BusinessKycEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessKycEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessKycEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
