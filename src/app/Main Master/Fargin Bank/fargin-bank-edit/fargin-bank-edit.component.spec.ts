import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarginBankEditComponent } from './fargin-bank-edit.component';

describe('FarginBankEditComponent', () => {
  let component: FarginBankEditComponent;
  let fixture: ComponentFixture<FarginBankEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarginBankEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarginBankEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
