import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuestatusoffdetailsComponent } from './duestatusoffdetails.component';

describe('DuestatusoffdetailsComponent', () => {
  let component: DuestatusoffdetailsComponent;
  let fixture: ComponentFixture<DuestatusoffdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DuestatusoffdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DuestatusoffdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
