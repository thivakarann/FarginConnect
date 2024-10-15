import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankViewallComponent } from './bank-viewall.component';

describe('BankViewallComponent', () => {
  let component: BankViewallComponent;
  let fixture: ComponentFixture<BankViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BankViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
