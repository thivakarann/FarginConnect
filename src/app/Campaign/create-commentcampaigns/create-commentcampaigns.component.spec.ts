import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommentcampaignsComponent } from './create-commentcampaigns.component';

describe('CreateCommentcampaignsComponent', () => {
  let component: CreateCommentcampaignsComponent;
  let fixture: ComponentFixture<CreateCommentcampaignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCommentcampaignsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCommentcampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
