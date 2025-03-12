import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecordcampaignComponent } from './view-recordcampaign.component';

describe('ViewRecordcampaignComponent', () => {
  let component: ViewRecordcampaignComponent;
  let fixture: ComponentFixture<ViewRecordcampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRecordcampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRecordcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
