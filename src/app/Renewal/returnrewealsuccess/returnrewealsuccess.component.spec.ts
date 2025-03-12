import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnrewealsuccessComponent } from './returnrewealsuccess.component';

describe('ReturnrewealsuccessComponent', () => {
  let component: ReturnrewealsuccessComponent;
  let fixture: ComponentFixture<ReturnrewealsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReturnrewealsuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnrewealsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
