import { Component, HostBinding, Renderer2, HostListener, Output, ElementRef, EventEmitter, Directive } from '@angular/core';
@Directive({
  selector: 'textarea[resize]'
})
export class ResizableTextAreaDirective {
  @Output() resize = new EventEmitter();

  _isDragging = false;
  _hasDragged = false;

  width: number | undefined;
  height: number | undefined;

  mouseMoveListener: Function | undefined;

  @HostListener('mousedown', ['$event.target'])
  onMouseDown() {
    this._hasDragged = false;
    this._isDragging = true;
    // this.mouseMoveListener = this.renderer.listen('document', 'mousemove', () => {
    //   if (this.width !== el.offsetWidth || this.height !== el.offsetHeight) {
    //     // this.resize.emit({ width: el.offsetWidth, height: el.offsetHeight });
    //     this.width = el.offsetWidth;
    //     this.height = el.offsetHeight;
    //   }
    // });
  }
  @HostListener('mousemove', ['$event.target'])
  onMouseMove(el: { offsetWidth: number | undefined; offsetHeight: number | undefined }) {
    if (this._isDragging) {
      this._hasDragged = true;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp() {
    if (this._isDragging) {
      this._isDragging = false;
      if (this._hasDragged) {
        this.resize.emit({ width: this.width, height: this.height });
        // this.resize.emit({ width: el.offsetWidth, height: el.offsetHeight });
      }
    }
  }

  constructor(private renderer: Renderer2) {}

  //   if (this.mouseMoveListener) {
  //     this.mouseMoveListener();
  //   }
  // }
}
