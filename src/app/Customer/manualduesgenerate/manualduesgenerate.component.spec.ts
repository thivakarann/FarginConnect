import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualduesgenerateComponent } from './manualduesgenerate.component';

describe('ManualduesgenerateComponent', () => {
  let component: ManualduesgenerateComponent;
  let fixture: ComponentFixture<ManualduesgenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualduesgenerateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualduesgenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
