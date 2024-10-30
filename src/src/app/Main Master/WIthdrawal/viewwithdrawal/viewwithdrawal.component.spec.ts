import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewwithdrawalComponent } from './viewwithdrawal.component';

describe('ViewwithdrawalComponent', () => {
  let component: ViewwithdrawalComponent;
  let fixture: ComponentFixture<ViewwithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewwithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
