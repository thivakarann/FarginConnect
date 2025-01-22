import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalCustomerpayinfoComponent } from './additional-customerpayinfo.component';

describe('AdditionalCustomerpayinfoComponent', () => {
  let component: AdditionalCustomerpayinfoComponent;
  let fixture: ComponentFixture<AdditionalCustomerpayinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalCustomerpayinfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalCustomerpayinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
