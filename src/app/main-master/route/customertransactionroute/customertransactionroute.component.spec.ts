import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomertransactionrouteComponent } from './customertransactionroute.component';

describe('CustomertransactionrouteComponent', () => {
  let component: CustomertransactionrouteComponent;
  let fixture: ComponentFixture<CustomertransactionrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomertransactionrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomertransactionrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
