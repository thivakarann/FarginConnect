import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewagreementsComponent } from './viewagreements.component';

describe('ViewagreementsComponent', () => {
  let component: ViewagreementsComponent;
  let fixture: ComponentFixture<ViewagreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewagreementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewagreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
