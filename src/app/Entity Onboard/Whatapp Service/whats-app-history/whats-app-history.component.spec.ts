import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsAppHistoryComponent } from './whats-app-history.component';

describe('WhatsAppHistoryComponent', () => {
  let component: WhatsAppHistoryComponent;
  let fixture: ComponentFixture<WhatsAppHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatsAppHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatsAppHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
