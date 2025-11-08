import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundGetallComponent } from './refund-getall.component';

describe('RefundGetallComponent', () => {
  let component: RefundGetallComponent;
  let fixture: ComponentFixture<RefundGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RefundGetallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RefundGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
