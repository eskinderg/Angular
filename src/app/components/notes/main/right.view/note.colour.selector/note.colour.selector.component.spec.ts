import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteColourSelectorComponent } from './note.colour.selector.component';

describe('NoteColourSelectorComponent', () => {
    let component: NoteColourSelectorComponent;
    let fixture: ComponentFixture<NoteColourSelectorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoteColourSelectorComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NoteColourSelectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
