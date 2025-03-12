import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraaddrouteComponent } from './extraaddroute.component';

describe('ExtraaddrouteComponent', () => {
  let component: ExtraaddrouteComponent;
  let fixture: ComponentFixture<ExtraaddrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtraaddrouteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExtraaddrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
