import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementviewComponent } from './announcementview.component';

describe('AnnouncementviewComponent', () => {
  let component: AnnouncementviewComponent;
  let fixture: ComponentFixture<AnnouncementviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnouncementviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnouncementviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
