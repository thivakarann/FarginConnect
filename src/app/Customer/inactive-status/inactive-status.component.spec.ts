import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveStatusComponent } from './inactive-status.component';

describe('InactiveStatusComponent', () => {
  let component: InactiveStatusComponent;
  let fixture: ComponentFixture<InactiveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InactiveStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InactiveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
