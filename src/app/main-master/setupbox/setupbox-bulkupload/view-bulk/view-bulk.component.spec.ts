import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBulkComponent } from './view-bulk.component';

describe('ViewBulkComponent', () => {
  let component: ViewBulkComponent;
  let fixture: ComponentFixture<ViewBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
