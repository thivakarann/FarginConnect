import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTransactionsComponent } from './success-transactions.component';

describe('SuccessTransactionsComponent', () => {
  let component: SuccessTransactionsComponent;
  let fixture: ComponentFixture<SuccessTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuccessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
