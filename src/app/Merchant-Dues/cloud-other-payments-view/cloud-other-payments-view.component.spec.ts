import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudOtherPaymentsViewComponent } from './cloud-other-payments-view.component';

describe('CloudOtherPaymentsViewComponent', () => {
  let component: CloudOtherPaymentsViewComponent;
  let fixture: ComponentFixture<CloudOtherPaymentsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloudOtherPaymentsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudOtherPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
