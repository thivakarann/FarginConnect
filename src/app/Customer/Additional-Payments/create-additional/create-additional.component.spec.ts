import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdditionalComponent } from './create-additional.component';

describe('CreateAdditionalComponent', () => {
  let component: CreateAdditionalComponent;
  let fixture: ComponentFixture<CreateAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAdditionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
