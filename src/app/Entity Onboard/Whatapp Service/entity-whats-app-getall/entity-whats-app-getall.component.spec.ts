import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityWhatsAppGetallComponent } from './entity-whats-app-getall.component';

describe('EntityWhatsAppGetallComponent', () => {
  let component: EntityWhatsAppGetallComponent;
  let fixture: ComponentFixture<EntityWhatsAppGetallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityWhatsAppGetallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityWhatsAppGetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
