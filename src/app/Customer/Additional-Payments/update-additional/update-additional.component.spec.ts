import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdditionalComponent } from './update-additional.component';

describe('UpdateAdditionalComponent', () => {
  let component: UpdateAdditionalComponent;
  let fixture: ComponentFixture<UpdateAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAdditionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
