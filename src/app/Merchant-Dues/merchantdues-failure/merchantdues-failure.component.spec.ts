import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantduesFailureComponent } from './merchantdues-failure.component';

describe('MerchantduesFailureComponent', () => {
  let component: MerchantduesFailureComponent;
  let fixture: ComponentFixture<MerchantduesFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MerchantduesFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantduesFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
