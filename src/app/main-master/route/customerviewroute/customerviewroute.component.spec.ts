import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerviewrouteComponent } from './customerviewroute.component';

describe('CustomerviewrouteComponent', () => {
  let component: CustomerviewrouteComponent;
  let fixture: ComponentFixture<CustomerviewrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerviewrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerviewrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
