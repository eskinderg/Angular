import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { DraggableDirective } from './draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

interface Position {
  x: number;
  y: number;
}

@Directive({
  selector: '[appMovable]'
})
export class MovableDirective extends DraggableDirective {
  @HostBinding('style.transform') get transform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(
      `translateX(${this.position.x}px) translateY(${this.position.y}px)`
    );
  }

  @HostBinding('class.movable') movable = false;

  position: Position = { x: 0, y: 0 };

  // private startPosition: Position | undefined;

  @Input('appMovableReset') reset = false;

  constructor(
    private sanitizer: DomSanitizer,
    public override element: ElementRef
  ) {
    super(element);
  }

  // @HostListener('dragStart', ['$event'])
  // onDragStart(event: PointerEvent) {
  //   this.startPosition = {
  //     x: event.clientX - this.position.x,
  //     y: event.clientY - this.position.y
  //   };
  // }

  // @HostListener('dragMove', ['$event'])
  // onDragMove(event: PointerEvent) {
  // this.position.x = event.clientX - this.startPosition.x;
  // this.position.y = event.clientY - this.startPosition.y;
  // }

  // @HostListener('dragEnd', ['$event'])
  // onDragEnd(event: PointerEvent) {
  //   if (this.reset) {
  //     this.position = { x: 0, y: 0 };
  //   }
  // }
}
