import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewrenewalComponent } from './viewrenewal.component';

describe('ViewrenewalComponent', () => {
  let component: ViewrenewalComponent;
  let fixture: ComponentFixture<ViewrenewalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewrenewalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewrenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
