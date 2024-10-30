import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKyccategoryComponent } from './add-kyccategory.component';

describe('AddKyccategoryComponent', () => {
  let component: AddKyccategoryComponent;
  let fixture: ComponentFixture<AddKyccategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddKyccategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddKyccategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
