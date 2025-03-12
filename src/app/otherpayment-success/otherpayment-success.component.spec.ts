import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentSuccessComponent } from './otherpayment-success.component';

describe('OtherpaymentSuccessComponent', () => {
  let component: OtherpaymentSuccessComponent;
  let fixture: ComponentFixture<OtherpaymentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpaymentSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
