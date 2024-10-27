import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsignersComponent } from './addsigners.component';

describe('AddsignersComponent', () => {
  let component: AddsignersComponent;
  let fixture: ComponentFixture<AddsignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsignersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddsignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
