import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMerchantcontentComponent } from './dashboard-merchantcontent.component';

describe('DashboardMerchantcontentComponent', () => {
  let component: DashboardMerchantcontentComponent;
  let fixture: ComponentFixture<DashboardMerchantcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardMerchantcontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardMerchantcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
