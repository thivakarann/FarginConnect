import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchIndividualviewComponent } from './branch-individualview.component';

describe('BranchIndividualviewComponent', () => {
  let component: BranchIndividualviewComponent;
  let fixture: ComponentFixture<BranchIndividualviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchIndividualviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchIndividualviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
