import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtermsComponent } from './viewterms.component';

describe('ViewtermsComponent', () => {
  let component: ViewtermsComponent;
  let fixture: ComponentFixture<ViewtermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewtermsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewtermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
