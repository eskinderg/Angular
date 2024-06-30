import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

export type Colour = { name: string };

export const Colours: Colour[] = [
    { name: 'red' },
    { name: 'green' },
    { name: 'yellow' },
    { name: 'violet' },
    { name: 'blue' },
    { name: 'none' }
];

@Component({
    selector: 'app-note-colour-selector',
    templateUrl: './note.colour.selector.component.html',
    styleUrls: ['./note.colour.selector.component.scss', '../../scss/notes.colour.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteColourSelectorComponent {
    @Output() noteColourUpdate = new EventEmitter(false);

    constructor() {}

    onClick(colour: Colour) {
        this.noteColourUpdate.emit(colour);
    }

    get Colours(): Colour[] {
        return Colours;
    }
}
