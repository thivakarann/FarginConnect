import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCusduesComponent } from './update-cusdues.component';

describe('UpdateCusduesComponent', () => {
  let component: UpdateCusduesComponent;
  let fixture: ComponentFixture<UpdateCusduesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateCusduesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCusduesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
