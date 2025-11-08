import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementsLinkExtentComponent } from './agreements-link-extent.component';

describe('AgreementsLinkExtentComponent', () => {
  let component: AgreementsLinkExtentComponent;
  let fixture: ComponentFixture<AgreementsLinkExtentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgreementsLinkExtentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgreementsLinkExtentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
