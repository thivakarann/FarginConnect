import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfacheckkeyComponent } from './editfacheckkey.component';

describe('EditfacheckkeyComponent', () => {
  let component: EditfacheckkeyComponent;
  let fixture: ComponentFixture<EditfacheckkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditfacheckkeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditfacheckkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
