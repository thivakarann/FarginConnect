import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermsConditionComponent } from './admin-terms-condition.component';

describe('AdminTermsConditionComponent', () => {
  let component: AdminTermsConditionComponent;
  let fixture: ComponentFixture<AdminTermsConditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTermsConditionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTermsConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
