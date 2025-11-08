import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappMessDescriptionComponent } from './whatsapp-mess-description.component';

describe('WhatsappMessDescriptionComponent', () => {
  let component: WhatsappMessDescriptionComponent;
  let fixture: ComponentFixture<WhatsappMessDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsappMessDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsappMessDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
