import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBussinessdocumentComponent } from './add-bussinessdocument.component';

describe('AddBussinessdocumentComponent', () => {
  let component: AddBussinessdocumentComponent;
  let fixture: ComponentFixture<AddBussinessdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBussinessdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBussinessdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
