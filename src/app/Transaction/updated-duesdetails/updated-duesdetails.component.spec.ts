import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDuesdetailsComponent } from './updated-duesdetails.component';

describe('UpdatedDuesdetailsComponent', () => {
  let component: UpdatedDuesdetailsComponent;
  let fixture: ComponentFixture<UpdatedDuesdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatedDuesdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatedDuesdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
