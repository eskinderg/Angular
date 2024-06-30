import { NgModule } from '@angular/core';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../../shared/shared.module';
import { NoteRightViewComponent } from './note.right.view.component';
import { NgaModule } from 'src/app/fragments/nga.module';
import { NoteHeaderControlComponent } from './note.header.control/note.header.control.component';
import { NoteColourSelectorComponent } from './note.colour.selector/note.colour.selector.component';
import { TextareaExpandedComponent } from './textAreaExpanded/textAreaExpanded.component';
import { TextSelection } from './textAreaExpanded/text.selection';

@NgModule({
    imports: [SharedModule, NgaModule, NgbPopoverModule],
    declarations: [
        NoteRightViewComponent,
        NoteHeaderControlComponent,
        NoteColourSelectorComponent,
        TextareaExpandedComponent
    ],
    exports: [NoteRightViewComponent],
    providers: [TextSelection]
})
export class NoteRightViewModule {}
