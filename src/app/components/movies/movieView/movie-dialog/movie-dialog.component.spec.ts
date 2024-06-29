import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDialogComponent } from './movie-dialog.component';

describe('MovieModalComponent', () => {
    let component: MovieDialogComponent;
    let fixture: ComponentFixture<MovieDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovieDialogComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MovieDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
