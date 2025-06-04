import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalAutodebitComponent } from './renewal-autodebit.component';

describe('RenewalAutodebitComponent', () => {
  let component: RenewalAutodebitComponent;
  let fixture: ComponentFixture<RenewalAutodebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RenewalAutodebitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewalAutodebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
