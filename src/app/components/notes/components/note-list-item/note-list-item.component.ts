import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FadeInOutNoteListItem } from 'src/app/components/shared/animations/fadeInAndOutNoteListItem';
import { Note } from 'src/app/models/note';

type Animate = {
  note: boolean;
  date?: boolean;
};

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  animations: [FadeInOutNoteListItem],
  styleUrl: './note-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteListItemComponent {

  @Input() note: Note;
  @Input() animate: Animate;
  @Input() selectedNote: Note;

  @Output() archiveNote = new EventEmitter(false);
  @Output() selectNote = new EventEmitter(false);
  @Output() changeNoteText = new EventEmitter(false);
  @Output() changePineOrder = new EventEmitter(false);

  constructor() { }

  onSelectNote(note: Note) {
    this.selectNote.emit(note)
  }

  onArchiveNote(note: Note) {
    this.archiveNote.emit(note)
  }

  updatePinOrder(note: Note) {
    this.changePineOrder.emit(note)
  }

}
