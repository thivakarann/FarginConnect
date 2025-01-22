import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherpaymentFailureComponent } from './otherpayment-failure.component';

describe('OtherpaymentFailureComponent', () => {
  let component: OtherpaymentFailureComponent;
  let fixture: ComponentFixture<OtherpaymentFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtherpaymentFailureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtherpaymentFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
