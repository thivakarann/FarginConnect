import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStickerTicketComponent } from './update-sticker-ticket.component';

describe('UpdateStickerTicketComponent', () => {
  let component: UpdateStickerTicketComponent;
  let fixture: ComponentFixture<UpdateStickerTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStickerTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateStickerTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
