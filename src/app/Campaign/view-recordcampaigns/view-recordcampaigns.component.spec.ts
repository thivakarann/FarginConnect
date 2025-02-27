import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordcampaignsComponent } from './view-recordcampaigns.component';

describe('ViewRecordcampaignsComponent', () => {
  let component: ViewRecordcampaignsComponent;
  let fixture: ComponentFixture<ViewRecordcampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRecordcampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRecordcampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
