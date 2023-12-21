import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieModalWrapperComponent } from './movie-modal-wrapper.component';

describe('MovieModalWrapperComponent', () => {
  let component: MovieModalWrapperComponent;
  let fixture: ComponentFixture<MovieModalWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieModalWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieModalWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
