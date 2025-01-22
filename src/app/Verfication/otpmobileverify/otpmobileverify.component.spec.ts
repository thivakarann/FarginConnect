import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmobileverifyComponent } from './otpmobileverify.component';

describe('OtpmobileverifyComponent', () => {
  let component: OtpmobileverifyComponent;
  let fixture: ComponentFixture<OtpmobileverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OtpmobileverifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpmobileverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
