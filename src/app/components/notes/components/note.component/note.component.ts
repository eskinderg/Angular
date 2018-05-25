import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Note } from '../../../../models/note';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss']
})
export class NoteComponent {

  @Input() note: Note;

  @Output() changeNoteText = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);
  @Output() changeNoteSize = new EventEmitter(false);
  @Output() deleteNote = new EventEmitter(false);

  constructor() { }

  handleChangeNotePosition({top, left}) {
    if (left !== this.note.left || top !== this.note.top) {
      if(this.note.id !=undefined)
      {
        this.changeNotePosition.emit({top: top, left: left});
      }
    }
  }
  handleChangeNoteText(updatedText) {
    if (updatedText !== this.note.text) {
      this.changeNoteText.emit(updatedText);
    }
  }

  handleNoteDelete(note) {
    this.deleteNote.emit(note);
  }

  handleResizeNote($event) {
    this.changeNoteSize.emit($event);
  }

}
