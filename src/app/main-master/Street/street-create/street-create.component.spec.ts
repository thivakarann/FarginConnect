import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetCreateComponent } from './street-create.component';

describe('StreetCreateComponent', () => {
  let component: StreetCreateComponent;
  let fixture: ComponentFixture<StreetCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StreetCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StreetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
