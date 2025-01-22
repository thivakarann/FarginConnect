import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcustomerrouteComponent } from './allcustomerroute.component';

describe('AllcustomerrouteComponent', () => {
  let component: AllcustomerrouteComponent;
  let fixture: ComponentFixture<AllcustomerrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllcustomerrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllcustomerrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
