import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsmsComponent } from './viewsms.component';

describe('ViewsmsComponent', () => {
  let component: ViewsmsComponent;
  let fixture: ComponentFixture<ViewsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewsmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
