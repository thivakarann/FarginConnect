import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionViewbyidComponent } from './transaction-viewbyid.component';

describe('TransactionViewbyidComponent', () => {
  let component: TransactionViewbyidComponent;
  let fixture: ComponentFixture<TransactionViewbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionViewbyidComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionViewbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
