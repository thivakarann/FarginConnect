import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrivacypolicyComponent } from './view-privacypolicy.component';

describe('ViewPrivacypolicyComponent', () => {
  let component: ViewPrivacypolicyComponent;
  let fixture: ComponentFixture<ViewPrivacypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPrivacypolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewPrivacypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
