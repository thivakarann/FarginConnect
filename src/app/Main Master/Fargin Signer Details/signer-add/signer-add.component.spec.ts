import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerAddComponent } from './signer-add.component';

describe('SignerAddComponent', () => {
  let component: SignerAddComponent;
  let fixture: ComponentFixture<SignerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignerAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
