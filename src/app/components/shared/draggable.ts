import {Directive, Input, Output, EventEmitter, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[draggable]'
})
export class Draggable {
    _isDragging = false;
    _hasDragged = false;
    _originalClientX: number;
    _originalClientY: number;
    _originalTop: number;
    _originalLeft: number;

    @Output('draggable') endDragEvent = new EventEmitter(false);

    constructor(public element: ElementRef) {
      this.element.nativeElement.style.position = 'absolute';
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown($event) {
      if ($event.target.style.position === 'absolute' && $event.target.style.left && $event.target.style.top) {
        this._hasDragged = false;
        this._isDragging = true;
        this._originalLeft = parseInt($event.target.style.left, 10);
        this._originalTop = parseInt($event.target.style.top, 10);
        this._originalClientX = $event.clientX;
        this._originalClientY = $event.clientY;
      }else {
        console.log('draggable: Error! the annotated ' + $event.target.nodeName +
         ' element needs to be inline styled with position, top and left');
      }
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove($event) {
      if (this._isDragging) {
        this._hasDragged = true;
        this.element.nativeElement.style.top  = (this._originalTop + ($event.clientY - this._originalClientY))  + 'px';
        this.element.nativeElement.style.left = (this._originalLeft + ($event.clientX - this._originalClientX)) + 'px';
      }
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp($event) {
      if (this._isDragging) {
        this._isDragging = false;
        if (this._hasDragged) {
          this.endDragEvent.emit({left: this._originalLeft +
            ($event.clientX - this._originalClientX), top: this._originalTop + ($event.clientY - this._originalClientY)});
        }
      }
    }
}
