import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllagreementplansComponent } from './allagreementplans.component';

describe('AllagreementplansComponent', () => {
  let component: AllagreementplansComponent;
  let fixture: ComponentFixture<AllagreementplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllagreementplansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllagreementplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
