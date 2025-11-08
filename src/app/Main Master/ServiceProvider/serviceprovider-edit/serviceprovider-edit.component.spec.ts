import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceproviderEditComponent } from './serviceprovider-edit.component';

describe('ServiceproviderEditComponent', () => {
  let component: ServiceproviderEditComponent;
  let fixture: ComponentFixture<ServiceproviderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceproviderEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceproviderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
