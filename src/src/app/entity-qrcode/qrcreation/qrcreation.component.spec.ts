import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRcreationComponent } from './qrcreation.component';

describe('QRcreationComponent', () => {
  let component: QRcreationComponent;
  let fixture: ComponentFixture<QRcreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QRcreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QRcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
