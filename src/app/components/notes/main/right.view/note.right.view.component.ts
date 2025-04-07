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
import { TextareaExpandedComponent as TextareaExpandedComponent_1 } from './textAreaExpanded/textAreaExpanded.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { DIALOG_BUTTONS } from 'src/app/shared/dialog/buttons.enum';

@Component({
    selector: 'app-note-right-view',
    templateUrl: 'note.right.view.component.html',
    styleUrls: ['note.right.view.component.scss', '../../scss/notes.colour.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgClass,
        NoteHeaderControlComponent,
        TooltipDirective,
        NoteColourSelectorComponent,
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

    constructor(
        private store: Store<fromNotes.INotesState>,
        private dialogService: DialogService
    ) {}

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

    noteInfoClick(note: Note) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        });
        const dateModified = new Date(note.dateModified);
        const dateCreated = new Date(note.dateCreated);
        this.dialogService.openDialog(
            'Info',
            `
                <strong>Title &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</strong> &nbsp;  ${note?.header ? note?.header : 'Untitled'}<br />
                <strong>Last Modified &nbsp;:</strong> &nbsp;  ${formatter.format(dateModified)}<br />
                <strong>Date Created &nbsp; :</strong> &nbsp; ${formatter.format(dateCreated)}<br />
                <strong>Pinned &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</strong> &nbsp; ${note?.pinned ? 'Yes' : 'No'}<br />
                <strong>Colour &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</strong> &nbsp; ${note?.colour ? note?.colour : 'none'}<br />
                <strong>Spell Check &nbsp; &nbsp; :</strong> &nbsp; ${note?.spellCheck ? 'on' : 'off'}<br />
                <strong>Owner &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; :</strong> &nbsp; ${note?.owner}
            `,
            DIALOG_BUTTONS.OK_ONLY
        );
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
