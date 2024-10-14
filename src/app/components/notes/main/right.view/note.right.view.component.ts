import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, viewChild } from '@angular/core';
import { Note } from '../../../../models/note';
import { TextareaExpandedComponent } from 'src/app/components/notes/main/right.view/textAreaExpanded/textAreaExpanded.component';
import * as fromNotes from '../../../../store/reducers/note.reducer';
import * as NotesActions from '../../../../store/actions/note.actions';
import { Store } from '@ngrx/store';
import { Colour, NoteColourSelectorComponent } from './note.colour.selector/note.colour.selector.component';
import { NoteHeaderControlComponent } from './note.header.control/note.header.control.component';
import { TooltipPosition } from 'src/app/fragments/components/tooltip/tooltip.enums';
import { NgClass, DatePipe } from '@angular/common';
import { TooltipDirective } from '../../../../fragments/components/tooltip/tooltip.directive';
import { PopoverDirective } from '../../../../fragments/components/popover/popover';
import { TextareaExpandedComponent as TextareaExpandedComponent_1 } from './textAreaExpanded/textAreaExpanded.component';

@Component({
    selector: 'app-note-right-view',
    templateUrl: 'note.right.view.component.html',
    styleUrls: ['note.right.view.component.scss', '../../scss/notes.colour.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgClass,
        NoteHeaderControlComponent,
        TooltipDirective,
        NoteColourSelectorComponent,
        PopoverDirective,
        TextareaExpandedComponent_1,
        DatePipe
    ]
})
export class NoteRightViewComponent {
    textAreaExpandedComponent = viewChild.required<TextareaExpandedComponent>('textAreaExpanded');
    noteHeaderControlComponent = viewChild.required<NoteHeaderControlComponent>('noteHeader');
    noteColourSelectorComponent = viewChild<NoteColourSelectorComponent>('noteColourSelector');
    tooltipPosition: TooltipPosition = TooltipPosition.LEFT;

    @Input() note: Note;
    @Input() facadeNote: Note;

    @Output() changeNoteText: EventEmitter<Note> = new EventEmitter();
    @Output() changeNotePosition: EventEmitter<Note> = new EventEmitter();
    @Output() changeNoteSize: EventEmitter<Note> = new EventEmitter();
    @Output() archiveNote: EventEmitter<Note> = new EventEmitter();
    @Output() updateNoteColour: EventEmitter<Note> = new EventEmitter();
    @Output() updateNoteHeader: EventEmitter<Note> = new EventEmitter();
    @Output() noteSelectionChange: EventEmitter<Note> = new EventEmitter();
    @Output() toggleSpellCheck: EventEmitter<Note> = new EventEmitter();

    constructor(private store: Store<fromNotes.INotesState>) {}

    noteArchive_click(note: Note) {
        this.archiveNote.emit(note);
    }

    spellCheckToggle(note: Note) {
        this.toggleSpellCheck.emit(note);
    }

    handleNoteTextUpdate(note: Note) {
        this.changeNoteText.emit(note);
    }

    selectionChange(selection: Note) {
        this.noteSelectionChange.emit(selection);
    }
    handleNoteColourUpdate(colour: Colour) {
        this.updateNoteColour.emit({ ...this.facadeNote, colour: colour.name });
    }

    handleNoteHeaderUpdate(note: Note) {
        this.updateNoteHeader.emit(note);
    }

    onUpdatOpendNote(note: Note) {
        this.store.dispatch(NotesActions.updateOpendNote({ payload: note }));
    }

    underline(e) {
        e.preventDefault();

        const selection = window.getSelection();

        const text = selection.toString();
        const span = document.createElement('span');
        span.innerHTML = text;

        span.style.textDecoration =
            selection.focusNode.parentElement.style.textDecorationLine === 'underline'
                ? 'none'
                : (span.style.textDecoration = 'underline');

        document.execCommand('insertHTML', false, span.outerHTML);
    }

    bold(e) {
        const selection = window.getSelection();

        const text = selection.toString();
        const span = document.createElement('span');
        span.innerHTML = text;

        span.style.fontWeight =
            selection.focusNode.parentElement.style.fontWeight === 'bold'
                ? 'normal'
                : (span.style.textDecoration = 'bold');

        document.execCommand('insertHTML', false, span.outerHTML);
        e.preventDefault();
    }

    saveSelection(): Range {
        const selection = window.getSelection();
        return selection.rangeCount === 0 ? null : selection.getRangeAt(0);
    }

    restoreSelection(range: Range) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}
