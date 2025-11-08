import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManualpaymentComponent } from './create-manualpayment.component';

describe('CreateManualpaymentComponent', () => {
  let component: CreateManualpaymentComponent;
  let fixture: ComponentFixture<CreateManualpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateManualpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateManualpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
