import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderLinkViewallComponent } from './service-provider-link-viewall.component';

describe('ServiceProviderLinkViewallComponent', () => {
  let component: ServiceProviderLinkViewallComponent;
  let fixture: ComponentFixture<ServiceProviderLinkViewallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProviderLinkViewallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderLinkViewallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
