import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKyccategoryComponent } from './edit-kyccategory.component';

describe('EditKyccategoryComponent', () => {
  let component: EditKyccategoryComponent;
  let fixture: ComponentFixture<EditKyccategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditKyccategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditKyccategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
