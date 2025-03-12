import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBulkfieldreponseComponent } from './view-bulkfieldreponse.component';

describe('ViewBulkfieldreponseComponent', () => {
  let component: ViewBulkfieldreponseComponent;
  let fixture: ComponentFixture<ViewBulkfieldreponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBulkfieldreponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBulkfieldreponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
