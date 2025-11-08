import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreationViewComponent } from './admincreation-view.component';

describe('AdmincreationViewComponent', () => {
  let component: AdmincreationViewComponent;
  let fixture: ComponentFixture<AdmincreationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmincreationViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmincreationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
