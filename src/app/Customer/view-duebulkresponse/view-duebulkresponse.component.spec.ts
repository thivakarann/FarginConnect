import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDuebulkresponseComponent } from './view-duebulkresponse.component';

describe('ViewDuebulkresponseComponent', () => {
  let component: ViewDuebulkresponseComponent;
  let fixture: ComponentFixture<ViewDuebulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDuebulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDuebulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
