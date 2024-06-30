import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { NoteLeftViewComponent } from './note.left.view.component';
import { NoteListItemComponent } from './note-list-item/note-list-item.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgaModule } from 'src/app/fragments/nga.module';

@NgModule({
    imports: [SharedModule, NgaModule, NgbTooltipModule],
    declarations: [NoteLeftViewComponent, NoteListItemComponent],
    exports: [NoteLeftViewComponent]
})
export class NoteLeftViewModule {}
