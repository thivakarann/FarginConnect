import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlacarteUploadbulkComponent } from './alacarte-uploadbulk.component';

describe('AlacarteUploadbulkComponent', () => {
  let component: AlacarteUploadbulkComponent;
  let fixture: ComponentFixture<AlacarteUploadbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlacarteUploadbulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlacarteUploadbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
