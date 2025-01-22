import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceticketComponent } from './add-serviceticket.component';

describe('AddServiceticketComponent', () => {
  let component: AddServiceticketComponent;
  let fixture: ComponentFixture<AddServiceticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServiceticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddServiceticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
