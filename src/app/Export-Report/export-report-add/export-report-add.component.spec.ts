import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportAddComponent } from './export-report-add.component';

describe('ExportReportAddComponent', () => {
  let component: ExportReportAddComponent;
  let fixture: ComponentFixture<ExportReportAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportReportAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportReportAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
