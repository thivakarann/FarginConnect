import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallTransactionsViewallComponent } from './overall-transactions-viewall.component';

describe('OverallTransactionsViewallComponent', () => {
  let component: OverallTransactionsViewallComponent;
  let fixture: ComponentFixture<OverallTransactionsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverallTransactionsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallTransactionsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
