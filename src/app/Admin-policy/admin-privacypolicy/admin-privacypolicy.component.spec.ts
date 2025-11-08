import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrivacypolicyComponent } from './admin-privacypolicy.component';

describe('AdminPrivacypolicyComponent', () => {
  let component: AdminPrivacypolicyComponent;
  let fixture: ComponentFixture<AdminPrivacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPrivacypolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminPrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
