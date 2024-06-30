import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NoteApiService } from './services/notes.api.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';
import { DraggableModule } from '../shared/draggable/draggable.module';
import { NgaModule } from '../../fragments/nga.module';
import { AddButtonComponent } from './components/add-button/add.button.component';
import { NoteResolver } from './services/note.resolve';
import { DraggableDirective, ResizableTextAreaDirective } from '../shared';
import { NoteArchiveComponent } from './notes.archive/note.archive.component';
import { NotesComponent } from './main/notes.component';
import { NotesDataService } from './services/notes.data.service';
import { NoteLeftViewModule } from './main/left.view/note.left.view.module';
import { NoteRightViewModule } from './main/right.view/note.right.view.module';

@NgModule({
    imports: [
        CommonModule,
        NotesRoutingModule,
        DraggableModule,
        NgaModule,
        SharedModule,
        NgbModule,
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
    providers: [NoteApiService, NotesDataService, NotesResolver, NoteResolver]
})
export class NotesModule {}
