import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkfiledexectivenameComponent } from './create-bulkfiledexectivename.component';

describe('CreateBulkfiledexectivenameComponent', () => {
  let component: CreateBulkfiledexectivenameComponent;
  let fixture: ComponentFixture<CreateBulkfiledexectivenameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBulkfiledexectivenameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBulkfiledexectivenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
