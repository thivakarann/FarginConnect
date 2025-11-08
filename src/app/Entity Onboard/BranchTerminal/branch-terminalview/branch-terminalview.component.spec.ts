import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchTerminalviewComponent } from './branch-terminalview.component';

describe('BranchTerminalviewComponent', () => {
  let component: BranchTerminalviewComponent;
  let fixture: ComponentFixture<BranchTerminalviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchTerminalviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchTerminalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
