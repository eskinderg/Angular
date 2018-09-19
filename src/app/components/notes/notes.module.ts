import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { NotesApiService } from './services/notes.api.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';
import { DraggableModule } from  '../shared/draggable/draggable.module';

import { NgaModule } from '../../theme/nga.module';

import { NotesComponent } from './components/notes.component';
import { NoteComponent } from './components/note.component/note.component';
import { AddButtonComponent } from './components/add-button/add.button.component';

import { Draggable, ResizableTextAreaDirective} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    DraggableModule,
    NgaModule,
    SharedModule,
  ],
  declarations: [
    NotesComponent,
    NoteComponent,
    AddButtonComponent,
    Draggable,
    ResizableTextAreaDirective
  ],
  exports: [NotesComponent, Draggable],
  providers: [NotesApiService, NotesResolver]
})
export class NotesModule { }
