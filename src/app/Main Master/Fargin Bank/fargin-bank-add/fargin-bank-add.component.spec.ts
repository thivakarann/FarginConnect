import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarginBankAddComponent } from './fargin-bank-add.component';

describe('FarginBankAddComponent', () => {
  let component: FarginBankAddComponent;
  let fixture: ComponentFixture<FarginBankAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarginBankAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarginBankAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
