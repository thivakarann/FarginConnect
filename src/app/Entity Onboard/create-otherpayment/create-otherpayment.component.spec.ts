import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOtherpaymentComponent } from './create-otherpayment.component';

describe('CreateOtherpaymentComponent', () => {
  let component: CreateOtherpaymentComponent;
  let fixture: ComponentFixture<CreateOtherpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOtherpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOtherpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
