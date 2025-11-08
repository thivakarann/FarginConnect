import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerGetallComponent } from './signer-getall.component';

describe('SignerGetallComponent', () => {
  let component: SignerGetallComponent;
  let fixture: ComponentFixture<SignerGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignerGetallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignerGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
