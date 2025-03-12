import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportReportsAddComponent } from './export-reports-add.component';

describe('ExportReportsAddComponent', () => {
  let component: ExportReportsAddComponent;
  let fixture: ComponentFixture<ExportReportsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportReportsAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExportReportsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
