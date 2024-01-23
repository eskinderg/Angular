import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Note } from '../../../../models/note';
import { ActivatedRoute } from '@angular/router';
import { NotesApiService } from '../../services/notes.api.service';
import { TextareaExpandedComponent } from 'src/app/fragments/components/textAreaExpanded/textAreaExpanded.component';
import * as fromNotes from '../../../../reducers/notes.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NoteComponent {

  @ViewChild(TextareaExpandedComponent) textarea: TextareaExpandedComponent;

  @Input() note: Note;

  @Output() changeNoteText = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);
  @Output() changeNoteSize = new EventEmitter(false);
  @Output() deleteNote = new EventEmitter(false);

  subscription: Subscription;

  constructor(private store: Store<fromNotes.NotesState>, private route: ActivatedRoute, private noteApiService: NotesApiService) {
    this.note = this.route.snapshot.data['note']
  }

  handleNoteTextChange(updatedNote: { id: number, newText: string }) {

    this.subscription = this.store.select(fromNotes.getNoteCurrentRoute).subscribe(n => {
      this.noteApiService.updateNoteText({ ...n, text: updatedNote.newText } as Note);
    })

    this.subscription.unsubscribe();
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
