import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';
import { MovableDirective } from './movable.directive';
import { MovableAreaDirective } from './movable-area.directive';
import { DraggableHelperDirective } from './draggable-helper.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [DraggableDirective, MovableDirective, MovableAreaDirective, DraggableHelperDirective],
    exports: [DraggableDirective, MovableDirective, MovableAreaDirective, DraggableHelperDirective]
})
export class DraggableModule {}
