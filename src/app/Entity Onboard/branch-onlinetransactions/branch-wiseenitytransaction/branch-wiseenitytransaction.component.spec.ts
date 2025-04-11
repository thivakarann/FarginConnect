import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchWiseenitytransactionComponent } from './branch-wiseenitytransaction.component';

describe('BranchWiseenitytransactionComponent', () => {
  let component: BranchWiseenitytransactionComponent;
  let fixture: ComponentFixture<BranchWiseenitytransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchWiseenitytransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchWiseenitytransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
