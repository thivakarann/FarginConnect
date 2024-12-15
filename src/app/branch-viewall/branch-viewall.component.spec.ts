import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchViewallComponent } from './branch-viewall.component';

describe('BranchViewallComponent', () => {
  let component: BranchViewallComponent;
  let fixture: ComponentFixture<BranchViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
