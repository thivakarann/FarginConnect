import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportsViewComponent } from './export-reports-view.component';

describe('ExportReportsViewComponent', () => {
  let component: ExportReportsViewComponent;
  let fixture: ComponentFixture<ExportReportsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportReportsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportReportsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
