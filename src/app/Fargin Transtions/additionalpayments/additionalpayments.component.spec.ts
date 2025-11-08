import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalpaymentsComponent } from './additionalpayments.component';

describe('AdditionalpaymentsComponent', () => {
  let component: AdditionalpaymentsComponent;
  let fixture: ComponentFixture<AdditionalpaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalpaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
