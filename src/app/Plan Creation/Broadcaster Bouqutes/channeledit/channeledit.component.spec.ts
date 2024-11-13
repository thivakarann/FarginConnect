import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChanneleditComponent } from './channeledit.component';

describe('ChanneleditComponent', () => {
  let component: ChanneleditComponent;
  let fixture: ComponentFixture<ChanneleditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChanneleditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChanneleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
