import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantduesSuccessComponent } from './merchantdues-success.component';

describe('MerchantduesSuccessComponent', () => {
  let component: MerchantduesSuccessComponent;
  let fixture: ComponentFixture<MerchantduesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantduesSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantduesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
