import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDialogWrapperComponent } from './movie-dialog-wrapper.component';

describe('MovieDialogWrapperComponent', () => {
    let component: MovieDialogWrapperComponent;
    let fixture: ComponentFixture<MovieDialogWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovieDialogWrapperComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(MovieDialogWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
