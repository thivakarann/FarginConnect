import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PascustomerdetailsComponent } from './pascustomerdetails.component';

describe('PascustomerdetailsComponent', () => {
  let component: PascustomerdetailsComponent;
  let fixture: ComponentFixture<PascustomerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PascustomerdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PascustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
