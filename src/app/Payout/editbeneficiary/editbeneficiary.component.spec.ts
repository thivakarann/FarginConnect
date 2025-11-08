import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbeneficiaryComponent } from './editbeneficiary.component';

describe('EditbeneficiaryComponent', () => {
  let component: EditbeneficiaryComponent;
  let fixture: ComponentFixture<EditbeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditbeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
