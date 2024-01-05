import { Component, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Note } from '../../../../models/note';
import { ActivatedRoute } from '@angular/router';
import { NotesApiService } from '../../services/notes.api.service';
import { TextareaExpandedComponent } from 'src/app/fragments/components/textAreaExpanded/textAreaExpanded.component';

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


  constructor(private route: ActivatedRoute, private noteApiService: NotesApiService) {
    this.note = this.route.snapshot.data['note']
  }

  handleChangeNoteText(updatedNote: Note) {
    this.noteApiService.updateNoteText(updatedNote);
  }

}
