import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBulkcampaignComponent } from './update-bulkcampaign.component';

describe('UpdateBulkcampaignComponent', () => {
  let component: UpdateBulkcampaignComponent;
  let fixture: ComponentFixture<UpdateBulkcampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBulkcampaignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateBulkcampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
