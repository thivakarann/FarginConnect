import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesIndividualViewComponent } from './branches-individual-view.component';

describe('BranchesIndividualViewComponent', () => {
  let component: BranchesIndividualViewComponent;
  let fixture: ComponentFixture<BranchesIndividualViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchesIndividualViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchesIndividualViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
