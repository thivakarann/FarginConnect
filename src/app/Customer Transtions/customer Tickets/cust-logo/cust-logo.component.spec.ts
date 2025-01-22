import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustLogoComponent } from './cust-logo.component';

describe('CustLogoComponent', () => {
  let component: CustLogoComponent;
  let fixture: ComponentFixture<CustLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustLogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
