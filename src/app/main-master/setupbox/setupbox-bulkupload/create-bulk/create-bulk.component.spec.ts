import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkComponent } from './create-bulk.component';

describe('CreateBulkComponent', () => {
  let component: CreateBulkComponent;
  let fixture: ComponentFixture<CreateBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
