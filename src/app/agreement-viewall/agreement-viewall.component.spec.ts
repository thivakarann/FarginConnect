import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementViewallComponent } from './agreement-viewall.component';

describe('AgreementViewallComponent', () => {
  let component: AgreementViewallComponent;
  let fixture: ComponentFixture<AgreementViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgreementViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
