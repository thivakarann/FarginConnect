import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersetupboxhistoryComponent } from './customersetupboxhistory.component';

describe('CustomersetupboxhistoryComponent', () => {
  let component: CustomersetupboxhistoryComponent;
  let fixture: ComponentFixture<CustomersetupboxhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersetupboxhistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersetupboxhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
