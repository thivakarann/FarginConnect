import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewaltransactiondetailsComponent } from './renewaltransactiondetails.component';

describe('RenewaltransactiondetailsComponent', () => {
  let component: RenewaltransactiondetailsComponent;
  let fixture: ComponentFixture<RenewaltransactiondetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenewaltransactiondetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewaltransactiondetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
