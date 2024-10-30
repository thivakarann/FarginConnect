import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageBussinessdocumentComponent } from './image-bussinessdocument.component';

describe('ImageBussinessdocumentComponent', () => {
  let component: ImageBussinessdocumentComponent;
  let fixture: ComponentFixture<ImageBussinessdocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageBussinessdocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageBussinessdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
