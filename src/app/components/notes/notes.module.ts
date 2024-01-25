import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NoteApiService } from './services/notes.api.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';
import { DraggableModule } from '../shared/draggable/draggable.module';

import { NgaModule } from '../../fragments/nga.module';

import { NoteComponent } from './components/note.component/note.component';
import { AddButtonComponent } from './components/add-button/add.button.component';

import { NoteResolver } from './components/note.component/note.resolve';

import { DraggableDirective, ResizableTextAreaDirective} from '../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NoteArchiveComponent } from './components/note.archive/note.archive.component';
import { NotesComponent } from './components/notes.component';
import { NoteListItemComponent } from './components/note-list-item/note-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    DraggableModule,
    NgaModule,
    SharedModule,
    NgbModule,
    NgScrollbarModule
  ],
  declarations: [
    NotesComponent,
    NoteComponent,
    NoteArchiveComponent,
    NoteListItemComponent,
    AddButtonComponent,
    DraggableDirective,
    ResizableTextAreaDirective
  ],
  providers: [NoteApiService, NotesResolver, NoteResolver]
})
export class NotesModule { }
