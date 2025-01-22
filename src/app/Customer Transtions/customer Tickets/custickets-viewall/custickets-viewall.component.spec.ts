import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusticketsViewallComponent } from './custickets-viewall.component';

describe('CusticketsViewallComponent', () => {
  let component: CusticketsViewallComponent;
  let fixture: ComponentFixture<CusticketsViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusticketsViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusticketsViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
