import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerHistoryComponent } from './signer-history.component';

describe('SignerHistoryComponent', () => {
  let component: SignerHistoryComponent;
  let fixture: ComponentFixture<SignerHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignerHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
