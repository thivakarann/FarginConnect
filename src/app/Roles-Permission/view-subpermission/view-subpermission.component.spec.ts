import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubpermissionComponent } from './view-subpermission.component';

describe('ViewSubpermissionComponent', () => {
  let component: ViewSubpermissionComponent;
  let fixture: ComponentFixture<ViewSubpermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSubpermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSubpermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
