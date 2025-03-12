import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSetupboxComponent } from './edit-setupbox.component';

describe('EditSetupboxComponent', () => {
  let component: EditSetupboxComponent;
  let fixture: ComponentFixture<EditSetupboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSetupboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSetupboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
