import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdisclaimerComponent } from './viewdisclaimer.component';

describe('ViewdisclaimerComponent', () => {
  let component: ViewdisclaimerComponent;
  let fixture: ComponentFixture<ViewdisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewdisclaimerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewdisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
