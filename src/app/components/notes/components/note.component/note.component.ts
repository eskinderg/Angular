import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Note } from '../../../../models/note';
import { TextareaExpandedComponent } from 'src/app/fragments/components/textAreaExpanded/textAreaExpanded.component';
import * as fromNotes from '../../../../reducers/note.reducer';
import * as NotesActions from '../../../../actions/note.actions';
import { Store } from '@ngrx/store';
import { Colour } from './note.colour.selector/note.colour.selector.component';
import { NoteHeaderControlComponent } from './note.header.control/note.header.control.component';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss', '../notes.colour.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteComponent {

  @ViewChild(TextareaExpandedComponent) textarea: TextareaExpandedComponent;
  @ViewChild(NoteHeaderControlComponent) nnoteHeaderControl: NoteHeaderControlComponent;

  @Input() note: Note;

  @Output() changeNoteText: EventEmitter<Note> = new EventEmitter();
  @Output() changeNotePosition: EventEmitter<Note> = new EventEmitter();
  @Output() changeNoteSize: EventEmitter<Note> = new EventEmitter();
  @Output() archiveNote: EventEmitter<Note> = new EventEmitter();
  @Output() updateNoteColour: EventEmitter<Note> = new EventEmitter();
  @Output() updateNoteHeader: EventEmitter<Note> = new EventEmitter();

  constructor(private store: Store<fromNotes.NotesState>) { }

  noteArchive_click(note: Note) {
    this.archiveNote.emit(note);
  }

  handleNoteTextUpdate(note: Note) {
    this.changeNoteText.emit(note)
  }

  handleNoteColourUpdate(colour: Colour) {
    this.updateNoteColour.emit({ ...this.note, colour: colour.name })
  }

  handleNoteHeaderUpdate(note: Note) {
    this.updateNoteHeader.emit(note)
  }

  onUpdatOpendNote(note: Note) {
    this.store.dispatch(NotesActions.updateOpendNote({ payload: note }))
  }


  underline(e) {
    e.preventDefault();

    let selection = window.getSelection()

    let text = selection.toString();
    let span = document.createElement('span');
    span.innerHTML = text;

    span.style.textDecoration = selection.focusNode.parentElement.style.textDecorationLine === 'underline'
      ? 'none' :
      span.style.textDecoration = 'underline'

    document.execCommand('insertHTML', false, span.outerHTML);
  }

  bold(e) {

    let selection = window.getSelection()

    let text = selection.toString();
    let span = document.createElement('span');
    span.innerHTML = text;

    span.style.fontWeight = selection.focusNode.parentElement.style.fontWeight === 'bold'
      ? 'normal' :
      span.style.textDecoration = 'bold'

    document.execCommand('insertHTML', false, span.outerHTML);
    e.preventDefault();
  }

  selectionChange(selection: Selection) {
    // this.selection = selection;
  }

  saveSelection(): Range {
    const selection = window.getSelection();
    return selection.rangeCount === 0 ? null : selection.getRangeAt(0);
  };

  restoreSelection(range: Range) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

}
