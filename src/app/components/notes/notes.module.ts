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

import { DraggableDirective, ResizableTextAreaDirective } from '../shared';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NoteArchiveComponent } from './components/note.archive/note.archive.component';
import { NotesComponent } from './components/notes.component';
import { NoteListItemComponent } from './components/note-list-item/note-list-item.component';
import { NoteColourSelectorComponent } from './components/note.component/note.colour.selector/note.colour.selector.component';
import { NoteHeaderControlComponent } from './components/note.component/note.header.control/note.header.control.component';
import { TextSelection } from 'src/app/fragments/components/textAreaExpanded/text.selection';

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
    NoteColourSelectorComponent,
    NoteHeaderControlComponent,
    NoteArchiveComponent,
    NoteListItemComponent,
    AddButtonComponent,
    DraggableDirective,
    ResizableTextAreaDirective
  ],
  providers: [NoteApiService, NotesResolver, NoteResolver, TextSelection]
})
export class NotesModule {}
