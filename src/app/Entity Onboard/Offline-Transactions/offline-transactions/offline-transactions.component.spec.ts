import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineTransactionsComponent } from './offline-transactions.component';

describe('OfflineTransactionsComponent', () => {
  let component: OfflineTransactionsComponent;
  let fixture: ComponentFixture<OfflineTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfflineTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfflineTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
