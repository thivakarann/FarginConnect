import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupboxCustomerviewComponent } from './setupbox-customerview.component';

describe('SetupboxCustomerviewComponent', () => {
  let component: SetupboxCustomerviewComponent;
  let fixture: ComponentFixture<SetupboxCustomerviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupboxCustomerviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupboxCustomerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
