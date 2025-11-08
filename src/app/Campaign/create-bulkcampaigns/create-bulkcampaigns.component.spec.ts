import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkcampaignsComponent } from './create-bulkcampaigns.component';

describe('CreateBulkcampaignsComponent', () => {
  let component: CreateBulkcampaignsComponent;
  let fixture: ComponentFixture<CreateBulkcampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBulkcampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBulkcampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
