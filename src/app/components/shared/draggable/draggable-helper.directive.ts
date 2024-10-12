import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
    selector: '[appDraggableHelper]',
    exportAs: 'appDraggableHelper',
    standalone: true
})
export class DraggableHelperDirective implements OnInit {
    private startPosition?: { x: number; y: number };

    constructor(
        private draggable: DraggableDirective,
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit(): void {
        this.draggable.dragStart.subscribe((event) => this.onDragStart(event));
        // this.draggable.dragMove.subscribe(event => this.onDragMove(event));
        // this.draggable.dragEnd.subscribe(() => this.onDragEnd());

        // create an overlay...
    }

    // ngOnDestroy(): void {
    // remove the overlay...
    // this.overlayRef.dispose();
    // }

    private onDragStart(event: PointerEvent): void {
        // determine relative start position
        const clientRect = this.draggable.element.nativeElement.getBoundingClientRect();

        this.startPosition = {
            x: event.clientX - clientRect.left,
            y: event.clientY - clientRect.top
        };
    }

    // private onDragMove(): void {
    // if (!this.overlayRef.hasAttached()) {
    // render the helper in the overlay
    // this.overlayRef.attach(new TemplatePortal(this.templateRef, this.viewContainerRef));
    // }

    // position the helper...
    // this.positionStrategy.left(`${event.clientX - this.startPosition.x}px`);
    // this.positionStrategy.top(`${event.clientY - this.startPosition.y}px`);
    // this.positionStrategy.apply();
    // }

    // private onDragEnd(): void {
    //   // remove the helper from the overlay
    //   this.overlayRef.detach();
    // }
}
