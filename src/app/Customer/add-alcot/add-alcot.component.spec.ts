import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlcotComponent } from './add-alcot.component';

describe('AddAlcotComponent', () => {
  let component: AddAlcotComponent;
  let fixture: ComponentFixture<AddAlcotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAlcotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAlcotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
