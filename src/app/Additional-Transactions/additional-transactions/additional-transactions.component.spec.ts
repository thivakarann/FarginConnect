import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalTransactionsComponent } from './additional-transactions.component';

describe('AdditionalTransactionsComponent', () => {
  let component: AdditionalTransactionsComponent;
  let fixture: ComponentFixture<AdditionalTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
