import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementlinkComponent } from './agreementlink.component';

describe('AgreementlinkComponent', () => {
  let component: AgreementlinkComponent;
  let fixture: ComponentFixture<AgreementlinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementlinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgreementlinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
