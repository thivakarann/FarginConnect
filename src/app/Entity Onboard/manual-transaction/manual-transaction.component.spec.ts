import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualTransactionComponent } from './manual-transaction.component';

describe('ManualTransactionComponent', () => {
  let component: ManualTransactionComponent;
  let fixture: ComponentFixture<ManualTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
