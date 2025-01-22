import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionManualpayComponent } from './transaction-manualpay.component';

describe('TransactionManualpayComponent', () => {
  let component: TransactionManualpayComponent;
  let fixture: ComponentFixture<TransactionManualpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionManualpayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionManualpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
