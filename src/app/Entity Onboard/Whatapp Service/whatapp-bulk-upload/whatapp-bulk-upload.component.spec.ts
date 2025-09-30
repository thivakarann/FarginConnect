import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatappBulkUploadComponent } from './whatapp-bulk-upload.component';

describe('WhatappBulkUploadComponent', () => {
  let component: WhatappBulkUploadComponent;
  let fixture: ComponentFixture<WhatappBulkUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatappBulkUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatappBulkUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
