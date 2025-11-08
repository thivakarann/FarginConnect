import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRefundpolicyComponent } from './view-refundpolicy.component';

describe('ViewRefundpolicyComponent', () => {
  let component: ViewRefundpolicyComponent;
  let fixture: ComponentFixture<ViewRefundpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRefundpolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRefundpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
