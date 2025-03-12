import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetupboxComponent } from './add-setupbox.component';

describe('AddSetupboxComponent', () => {
  let component: AddSetupboxComponent;
  let fixture: ComponentFixture<AddSetupboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSetupboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSetupboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
