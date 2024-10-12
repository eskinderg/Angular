import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GenreListItemComponent } from './genre-list-item/genre-list-item.component';
import { LeftViewComponent } from './left.view.component';

@NgModule({
    imports: [SharedModule, GenreListItemComponent, LeftViewComponent],
    exports: [LeftViewComponent]
})
export class LeftViewModule {}
