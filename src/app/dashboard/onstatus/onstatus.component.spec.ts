import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnstatusComponent } from './onstatus.component';

describe('OnstatusComponent', () => {
  let component: OnstatusComponent;
  let fixture: ComponentFixture<OnstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
