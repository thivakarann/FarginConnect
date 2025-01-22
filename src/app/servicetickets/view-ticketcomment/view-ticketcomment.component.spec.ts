import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketcommentComponent } from './view-ticketcomment.component';

describe('ViewTicketcommentComponent', () => {
  let component: ViewTicketcommentComponent;
  let fixture: ComponentFixture<ViewTicketcommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketcommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewTicketcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
