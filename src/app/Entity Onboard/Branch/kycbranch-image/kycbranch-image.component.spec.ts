import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycbranchImageComponent } from './kycbranch-image.component';

describe('KycbranchImageComponent', () => {
  let component: KycbranchImageComponent;
  let fixture: ComponentFixture<KycbranchImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KycbranchImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KycbranchImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
