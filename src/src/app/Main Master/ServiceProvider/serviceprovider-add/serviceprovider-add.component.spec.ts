import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderAddComponent } from './serviceprovider-add.component';

describe('ServiceproviderAddComponent', () => {
  let component: ServiceproviderAddComponent;
  let fixture: ComponentFixture<ServiceproviderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceproviderAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceproviderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
