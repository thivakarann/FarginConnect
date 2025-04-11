import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOnlineviewComponent } from './branch-onlineview.component';

describe('BranchOnlineviewComponent', () => {
  let component: BranchOnlineviewComponent;
  let fixture: ComponentFixture<BranchOnlineviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchOnlineviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BranchOnlineviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
