import {
  Renderer2,
  Component,
  HostListener,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Note } from '../../../../models/note';
import { CdkDragEnd, CdkDrag } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-note',
  templateUrl: 'note.component.html',
  styleUrls: ['note.component.scss']
})
export class NoteComponent {

  @Input() note: Note;

  @Output() changeNoteText     = new EventEmitter(false);
  @Output() changeNotePosition = new EventEmitter(false);
  @Output() changeNoteSize     = new EventEmitter(false);
  @Output() deleteNote         = new EventEmitter(false);

  @ViewChild('notediv', {static:true}) textarea: ElementRef;

  constructor( private renderer: Renderer2 ) { }

  dragEnded(eee: CdkDragEnd ) {
    // this.textarea.nativeElement.style.top = '0px';
    // this.textarea.nativeElement.style.left = '0px';
    // alert('yes')
    const viewRect: ClientRect = this.textarea.nativeElement.getBoundingClientRect();

    // this.changeNotePosition.emit({top: viewRect.top, left: Math.round(viewRect.left)});
    console.log(viewRect.left - parseInt(this.textarea.nativeElement.style.left));
    console.log(eee.source)
  }

  handleChangeNotePosition(event: PointerEvent) {
    console.log(event)
    // if (left !== this.note.left || top !== this.note.top) {
    //   if(this.note.id !=undefined)
    //   {
    //     this.changeNotePosition.emit({top: top, left: left});
    //   }
    // }
  }

  // @HostListener('mouseup', ['$event'])
  onMouseUp($event) {
    // console.log($event.target.style)
    // console.log($event)
    // if (this._isDragging) {
    //   this._isDragging = false;
    //   if (this._hasDragged) {
    //     this.endDragEvent.emit({left: this._originalLeft +
    //       ($event.clientX - this._originalClientX), top: this._originalTop + ($event.clientY - this._originalClientY)});
    //   }
  }

  handleChangeNoteText(updatedText) {
    // console.log(updatedText);
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
