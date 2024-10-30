import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKycdocumentComponent } from './add-kycdocument.component';

describe('AddKycdocumentComponent', () => {
  let component: AddKycdocumentComponent;
  let fixture: ComponentFixture<AddKycdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKycdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKycdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
