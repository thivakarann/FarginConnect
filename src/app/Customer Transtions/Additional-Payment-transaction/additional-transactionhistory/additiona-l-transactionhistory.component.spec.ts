import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionaLTransactionhistoryComponent } from './additiona-l-transactionhistory.component';

describe('AdditionaLTransactionhistoryComponent', () => {
  let component: AdditionaLTransactionhistoryComponent;
  let fixture: ComponentFixture<AdditionaLTransactionhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionaLTransactionhistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionaLTransactionhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
