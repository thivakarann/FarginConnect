import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetupbulkresponseComponent } from './view-setupbulkresponse.component';

describe('ViewSetupbulkresponseComponent', () => {
  let component: ViewSetupbulkresponseComponent;
  let fixture: ComponentFixture<ViewSetupbulkresponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSetupbulkresponseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSetupbulkresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
