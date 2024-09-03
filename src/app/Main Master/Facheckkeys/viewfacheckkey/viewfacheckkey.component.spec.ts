import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfacheckkeyComponent } from './viewfacheckkey.component';

describe('ViewfacheckkeyComponent', () => {
  let component: ViewfacheckkeyComponent;
  let fixture: ComponentFixture<ViewfacheckkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewfacheckkeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewfacheckkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
