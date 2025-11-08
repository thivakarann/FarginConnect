import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportViewallComponent } from './export-report-viewall.component';

describe('ExportReportViewallComponent', () => {
  let component: ExportReportViewallComponent;
  let fixture: ComponentFixture<ExportReportViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportReportViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportReportViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
