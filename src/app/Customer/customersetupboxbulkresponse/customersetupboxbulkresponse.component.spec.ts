import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersetupboxbulkresponseComponent } from './customersetupboxbulkresponse.component';

describe('CustomersetupboxbulkresponseComponent', () => {
  let component: CustomersetupboxbulkresponseComponent;
  let fixture: ComponentFixture<CustomersetupboxbulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersetupboxbulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersetupboxbulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
