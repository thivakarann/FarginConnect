import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceticketComponent } from './edit-serviceticket.component';

describe('EditServiceticketComponent', () => {
  let component: EditServiceticketComponent;
  let fixture: ComponentFixture<EditServiceticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditServiceticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditServiceticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
