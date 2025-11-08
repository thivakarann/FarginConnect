import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlacarteBulkresponseComponent } from './alacarte-bulkresponse.component';

describe('AlacarteBulkresponseComponent', () => {
  let component: AlacarteBulkresponseComponent;
  let fixture: ComponentFixture<AlacarteBulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlacarteBulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlacarteBulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
