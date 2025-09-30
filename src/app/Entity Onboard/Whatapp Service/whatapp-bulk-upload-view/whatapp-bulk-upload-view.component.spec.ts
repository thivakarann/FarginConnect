import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatappBulkUploadViewComponent } from './whatapp-bulk-upload-view.component';

describe('WhatappBulkUploadViewComponent', () => {
  let component: WhatappBulkUploadViewComponent;
  let fixture: ComponentFixture<WhatappBulkUploadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WhatappBulkUploadViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhatappBulkUploadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
