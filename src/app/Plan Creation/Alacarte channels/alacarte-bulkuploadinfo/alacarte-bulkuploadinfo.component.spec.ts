import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlacarteBulkuploadinfoComponent } from './alacarte-bulkuploadinfo.component';

describe('AlacarteBulkuploadinfoComponent', () => {
  let component: AlacarteBulkuploadinfoComponent;
  let fixture: ComponentFixture<AlacarteBulkuploadinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlacarteBulkuploadinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlacarteBulkuploadinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
