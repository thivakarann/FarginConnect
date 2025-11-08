import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalBussinessdocumentComponent } from './approval-bussinessdocument.component';

describe('ApprovalBussinessdocumentComponent', () => {
  let component: ApprovalBussinessdocumentComponent;
  let fixture: ComponentFixture<ApprovalBussinessdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalBussinessdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApprovalBussinessdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
