import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherpaymentComponent } from './edit-otherpayment.component';

describe('EditOtherpaymentComponent', () => {
  let component: EditOtherpaymentComponent;
  let fixture: ComponentFixture<EditOtherpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditOtherpaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditOtherpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
