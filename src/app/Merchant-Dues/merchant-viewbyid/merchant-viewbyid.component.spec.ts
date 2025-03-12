import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantViewbyidComponent } from './merchant-viewbyid.component';

describe('MerchantViewbyidComponent', () => {
  let component: MerchantViewbyidComponent;
  let fixture: ComponentFixture<MerchantViewbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantViewbyidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantViewbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
