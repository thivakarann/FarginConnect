import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketimageComponent } from './view-ticketimage.component';

describe('ViewTicketimageComponent', () => {
  let component: ViewTicketimageComponent;
  let fixture: ComponentFixture<ViewTicketimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTicketimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
