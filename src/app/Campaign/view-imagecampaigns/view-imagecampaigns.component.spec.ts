import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImagecampaignsComponent } from './view-imagecampaigns.component';

describe('ViewImagecampaignsComponent', () => {
  let component: ViewImagecampaignsComponent;
  let fixture: ComponentFixture<ViewImagecampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewImagecampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewImagecampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
