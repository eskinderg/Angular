import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { NotesApiService } from '../services/notes.api.service';
import { fadeInAnimation } from '../../shared/animations/fadeInAnimation';
import { Note } from '../../../models/note';

@Component({
  selector: 'app-notes',
  templateUrl: 'notes.component.html',
  styleUrls: ['notes.component.scss'],
  animations: [ fadeInAnimation ],
  host: { '[@routerFadeInAnimation]': '' }
})
export class NotesComponent {
  trappedBoxes = ['Trapped 1', 'Trapped 2'];
  $notes: Observable<Note[]>;

  constructor(private notesApiService: NotesApiService) {
    this.$notes = this.notesApiService.getNotes();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp($event) {
    // console.log($event.clientX);
    // if (this._isDragging) {
    //   this._isDragging = false;
    //   if (this._hasDragged) {
    //     this.endDragEvent.emit({left: this._originalLeft +
    //       ($event.clientX - this._originalClientX), top: this._originalTop + ($event.clientY - this._originalClientY)});
    //   }
    }
  onAddNote(colour) {
    alert(colour)

    const newNote = new Note({
      header: 'Untitled',
      text: '',
      colour: colour,
      width: 200,
      height: 150,
      left: Math.floor(Math.random() * 600),
      top: Math.floor(Math.random() * 400)
    });

    this.notesApiService.addNote(newNote);
  }

  onChangeNoteText(newText: any , note: Note) {
    // console.log( newText );
    this.notesApiService.changeNoteText({...note, text: newText});
  }

  onChangeNotePosition( {top , left} , note: Note) {
    this.notesApiService.changeNotePosition({...note, left: left, top: top});
  }

  onChangeNoteSize( {height , width} , note: Note) {
    this.notesApiService.changeNoteSize({...note, width: width, height: height});
  }

  onNoteDelete(note: Note) {
    // this.notesApiService.deleteNote(note);
    alert(note.text);
  }
}
