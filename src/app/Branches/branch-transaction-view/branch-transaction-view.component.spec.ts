import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTransactionViewComponent } from './branch-transaction-view.component';

describe('BranchTransactionViewComponent', () => {
  let component: BranchTransactionViewComponent;
  let fixture: ComponentFixture<BranchTransactionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTransactionViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTransactionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
