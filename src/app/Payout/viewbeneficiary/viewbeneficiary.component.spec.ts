import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbeneficiaryComponent } from './viewbeneficiary.component';

describe('ViewbeneficiaryComponent', () => {
  let component: ViewbeneficiaryComponent;
  let fixture: ComponentFixture<ViewbeneficiaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewbeneficiaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewbeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
