import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVerficationComponent } from './mobile-verfication.component';

describe('MobileVerficationComponent', () => {
  let component: MobileVerficationComponent;
  let fixture: ComponentFixture<MobileVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileVerficationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
