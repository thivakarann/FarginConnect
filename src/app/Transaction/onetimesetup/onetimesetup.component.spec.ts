import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimesetupComponent } from './onetimesetup.component';

describe('OnetimesetupComponent', () => {
  let component: OnetimesetupComponent;
  let fixture: ComponentFixture<OnetimesetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnetimesetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnetimesetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
