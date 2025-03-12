import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesViewallComponent } from './branches-viewall.component';

describe('BranchesViewallComponent', () => {
  let component: BranchesViewallComponent;
  let fixture: ComponentFixture<BranchesViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchesViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchesViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
