import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlogoComponent } from './viewlogo.component';

describe('ViewlogoComponent', () => {
  let component: ViewlogoComponent;
  let fixture: ComponentFixture<ViewlogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewlogoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewlogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
