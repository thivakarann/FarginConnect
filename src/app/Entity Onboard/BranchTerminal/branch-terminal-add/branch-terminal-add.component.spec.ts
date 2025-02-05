import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTerminalAddComponent } from './branch-terminal-add.component';

describe('BranchTerminalAddComponent', () => {
  let component: BranchTerminalAddComponent;
  let fixture: ComponentFixture<BranchTerminalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTerminalAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTerminalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
