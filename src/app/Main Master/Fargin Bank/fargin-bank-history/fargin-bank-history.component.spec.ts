import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarginBankHistoryComponent } from './fargin-bank-history.component';

describe('FarginBankHistoryComponent', () => {
  let component: FarginBankHistoryComponent;
  let fixture: ComponentFixture<FarginBankHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarginBankHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarginBankHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
