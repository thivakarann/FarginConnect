import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTerminalViewComponent } from './branch-terminal-view.component';

describe('BranchTerminalViewComponent', () => {
  let component: BranchTerminalViewComponent;
  let fixture: ComponentFixture<BranchTerminalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTerminalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTerminalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
