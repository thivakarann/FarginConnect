import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManualpaymentComponent } from './update-manualpayment.component';

describe('UpdateManualpaymentComponent', () => {
  let component: UpdateManualpaymentComponent;
  let fixture: ComponentFixture<UpdateManualpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateManualpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateManualpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
