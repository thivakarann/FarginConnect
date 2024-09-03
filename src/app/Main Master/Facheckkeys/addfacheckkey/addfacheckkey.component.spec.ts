import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfacheckkeyComponent } from './addfacheckkey.component';

describe('AddfacheckkeyComponent', () => {
  let component: AddfacheckkeyComponent;
  let fixture: ComponentFixture<AddfacheckkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddfacheckkeyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddfacheckkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
