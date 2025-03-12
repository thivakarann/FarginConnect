import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceticketComponent } from './view-serviceticket.component';

describe('ViewServiceticketComponent', () => {
  let component: ViewServiceticketComponent;
  let fixture: ComponentFixture<ViewServiceticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewServiceticketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewServiceticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
