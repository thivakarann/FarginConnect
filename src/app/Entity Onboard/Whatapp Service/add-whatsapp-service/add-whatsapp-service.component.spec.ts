import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWhatsappServiceComponent } from './add-whatsapp-service.component';

describe('AddWhatsappServiceComponent', () => {
  let component: AddWhatsappServiceComponent;
  let fixture: ComponentFixture<AddWhatsappServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWhatsappServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWhatsappServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
