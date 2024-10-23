import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerticketImageComponent } from './customerticket-image.component';

describe('CustomerticketImageComponent', () => {
  let component: CustomerticketImageComponent;
  let fixture: ComponentFixture<CustomerticketImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerticketImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerticketImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
