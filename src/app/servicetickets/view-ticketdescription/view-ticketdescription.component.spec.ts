import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketdescriptionComponent } from './view-ticketdescription.component';

describe('ViewTicketdescriptionComponent', () => {
  let component: ViewTicketdescriptionComponent;
  let fixture: ComponentFixture<ViewTicketdescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketdescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTicketdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
