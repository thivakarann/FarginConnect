import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupboxnumberreadmoreComponent } from './setupboxnumberreadmore.component';

describe('SetupboxnumberreadmoreComponent', () => {
  let component: SetupboxnumberreadmoreComponent;
  let fixture: ComponentFixture<SetupboxnumberreadmoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupboxnumberreadmoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupboxnumberreadmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
