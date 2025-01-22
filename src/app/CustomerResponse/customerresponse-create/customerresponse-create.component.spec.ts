import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerresponseCreateComponent } from './customerresponse-create.component';

describe('CustomerresponseCreateComponent', () => {
  let component: CustomerresponseCreateComponent;
  let fixture: ComponentFixture<CustomerresponseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerresponseCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerresponseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
