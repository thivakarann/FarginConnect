import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrastreetComponent } from './extrastreet.component';

describe('ExtrastreetComponent', () => {
  let component: ExtrastreetComponent;
  let fixture: ComponentFixture<ExtrastreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtrastreetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtrastreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
