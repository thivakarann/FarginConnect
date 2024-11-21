import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerUpdateComponent } from './signer-update.component';

describe('SignerUpdateComponent', () => {
  let component: SignerUpdateComponent;
  let fixture: ComponentFixture<SignerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignerUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
