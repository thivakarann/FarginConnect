import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalviewComponent } from './personalview.component';

describe('PersonalviewComponent', () => {
  let component: PersonalviewComponent;
  let fixture: ComponentFixture<PersonalviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
