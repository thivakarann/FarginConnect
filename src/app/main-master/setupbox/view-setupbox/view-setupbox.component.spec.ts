import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSetupboxComponent } from './view-setupbox.component';

describe('ViewSetupboxComponent', () => {
  let component: ViewSetupboxComponent;
  let fixture: ComponentFixture<ViewSetupboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSetupboxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSetupboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
