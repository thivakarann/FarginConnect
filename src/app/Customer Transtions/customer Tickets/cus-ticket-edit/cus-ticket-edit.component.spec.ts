import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusTicketEditComponent } from './cus-ticket-edit.component';

describe('CusTicketEditComponent', () => {
  let component: CusTicketEditComponent;
  let fixture: ComponentFixture<CusTicketEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusTicketEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CusTicketEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
