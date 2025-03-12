import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionaltransactionIndividualviewComponent } from './additionaltransaction-individualview.component';

describe('AdditionaltransactionIndividualviewComponent', () => {
  let component: AdditionaltransactionIndividualviewComponent;
  let fixture: ComponentFixture<AdditionaltransactionIndividualviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionaltransactionIndividualviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionaltransactionIndividualviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
