import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewadditionalpaymentsComponent } from './viewadditionalpayments.component';

describe('ViewadditionalpaymentsComponent', () => {
  let component: ViewadditionalpaymentsComponent;
  let fixture: ComponentFixture<ViewadditionalpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewadditionalpaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewadditionalpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
