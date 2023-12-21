import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailModalComponent } from './movie-modal.component';

describe('MovieModalComponent', () => {
  let component: MovieDetailModalComponent;
  let fixture: ComponentFixture<MovieDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
