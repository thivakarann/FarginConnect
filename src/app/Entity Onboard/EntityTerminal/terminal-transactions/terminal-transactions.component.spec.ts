import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalTransactionsComponent } from './terminal-transactions.component';

describe('TerminalTransactionsComponent', () => {
  let component: TerminalTransactionsComponent;
  let fixture: ComponentFixture<TerminalTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalTransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminalTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
