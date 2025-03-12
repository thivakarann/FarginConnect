import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantViewallComponent } from './merchant-viewall.component';

describe('MerchantViewallComponent', () => {
  let component: MerchantViewallComponent;
  let fixture: ComponentFixture<MerchantViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
