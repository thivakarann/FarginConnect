import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTerminalEditComponent } from './branch-terminal-edit.component';

describe('BranchTerminalEditComponent', () => {
  let component: BranchTerminalEditComponent;
  let fixture: ComponentFixture<BranchTerminalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTerminalEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTerminalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
