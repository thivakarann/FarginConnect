import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImagecampaignComponent } from './view-imagecampaign.component';

describe('ViewImagecampaignComponent', () => {
  let component: ViewImagecampaignComponent;
  let fixture: ComponentFixture<ViewImagecampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewImagecampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewImagecampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
