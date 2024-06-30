import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NoteApiService } from './services/notes.api.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';
import { DraggableModule } from '../shared/draggable/draggable.module';

import { NgaModule } from '../../fragments/nga.module';

import { AddButtonComponent } from './components/add-button/add.button.component';

import { NoteResolver } from './components/note.component/note.resolve';

import { DraggableDirective, ResizableTextAreaDirective } from '../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NoteArchiveComponent } from './components/note.archive/note.archive.component';
import { NotesComponent } from './notes.component';
import { TextSelection } from 'src/app/components/notes/right.view/textAreaExpanded/text.selection';
import { NotesDataService } from './services/notes.data.service';
import { NoteLeftViewModule } from './left.view/note.left.view.module';
import { NoteRightViewModule } from './right.view/note.right.view.module';

@NgModule({
    imports: [
        CommonModule,
        NotesRoutingModule,
        DraggableModule,
        NgaModule,
        SharedModule,
        NgbModule,
        NgScrollbarModule,
        NoteLeftViewModule,
        NoteRightViewModule
    ],
    declarations: [
        NotesComponent,
        NoteArchiveComponent,
        AddButtonComponent,
        DraggableDirective,
        ResizableTextAreaDirective
    ],
    providers: [NoteApiService, NotesDataService, NotesResolver, NoteResolver, TextSelection]
})
export class NotesModule {}
