import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
// import { Draggable } from '../../../shared';j
import { Note } from '../../note';

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss'],
  // directives: [Draggable, NgClass]
})
export class NoteComponent {
  @Input() text: string;
  @Input() top: number;
  @Input() left: number;
  @Input() id: string;
  @Input() colour: string;
  @Input() disabled: boolean;

  @Output() changeNoteText = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);
  @Output() deleteNote = new EventEmitter(false);

  constructor() {}

  handleChangeNotePosition(newPosition) {
    if (newPosition.left !== this.left || newPosition.top !== this.top) {
      this.changeNotePosition.emit(newPosition);
    }
  }
  handleChangeNoteText(updatedText) {
    if (updatedText !== this.text) {
      this.changeNoteText.emit(updatedText);
    }
  }

  handleNoteDelete(id) {
    this.deleteNote.emit(id);
  }

}
