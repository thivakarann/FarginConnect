import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseBulkComponent } from './response-bulk.component';

describe('ResponseBulkComponent', () => {
  let component: ResponseBulkComponent;
  let fixture: ComponentFixture<ResponseBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseBulkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
