import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsignersComponent } from './viewsigners.component';

describe('ViewsignersComponent', () => {
  let component: ViewsignersComponent;
  let fixture: ComponentFixture<ViewsignersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsignersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsignersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
