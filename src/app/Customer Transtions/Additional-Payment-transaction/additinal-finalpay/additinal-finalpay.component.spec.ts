import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditinalFinalpayComponent } from './additinal-finalpay.component';

describe('AdditinalFinalpayComponent', () => {
  let component: AdditinalFinalpayComponent;
  let fixture: ComponentFixture<AdditinalFinalpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditinalFinalpayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditinalFinalpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
