import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByRedirectComponent } from './by-redirect.component';

describe('ByRedirectComponent', () => {
  let component: ByRedirectComponent;
  let fixture: ComponentFixture<ByRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ByRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ByRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
