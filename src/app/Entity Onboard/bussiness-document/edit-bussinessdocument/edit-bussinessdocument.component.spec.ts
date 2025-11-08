import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBussinessdocumentComponent } from './edit-bussinessdocument.component';

describe('EditBussinessdocumentComponent', () => {
  let component: EditBussinessdocumentComponent;
  let fixture: ComponentFixture<EditBussinessdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBussinessdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditBussinessdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
