import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LCOPViewComponent } from './lcopview.component';

describe('LCOPViewComponent', () => {
  let component: LCOPViewComponent;
  let fixture: ComponentFixture<LCOPViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LCOPViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LCOPViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
