import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarginBankviewComponent } from './fargin-bankview.component';

describe('FarginBankviewComponent', () => {
  let component: FarginBankviewComponent;
  let fixture: ComponentFixture<FarginBankviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarginBankviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FarginBankviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
