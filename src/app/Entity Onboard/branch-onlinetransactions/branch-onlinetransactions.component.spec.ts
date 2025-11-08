import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOnlinetransactionsComponent } from './branch-onlinetransactions.component';

describe('BranchOnlinetransactionsComponent', () => {
  let component: BranchOnlinetransactionsComponent;
  let fixture: ComponentFixture<BranchOnlinetransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchOnlinetransactionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchOnlinetransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
