import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadInfoComponent } from './bulk-upload-info.component';

describe('BulkUploadInfoComponent', () => {
  let component: BulkUploadInfoComponent;
  let fixture: ComponentFixture<BulkUploadInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkUploadInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkUploadInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
