import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpayManualpaymentComponent } from './otherpay-manualpayment.component';

describe('OtherpayManualpaymentComponent', () => {
  let component: OtherpayManualpaymentComponent;
  let fixture: ComponentFixture<OtherpayManualpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpayManualpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpayManualpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
