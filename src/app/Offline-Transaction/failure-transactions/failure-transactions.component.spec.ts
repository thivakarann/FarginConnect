import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureTransactionsComponent } from './failure-transactions.component';

describe('FailureTransactionsComponent', () => {
  let component: FailureTransactionsComponent;
  let fixture: ComponentFixture<FailureTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailureTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailureTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
