import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { NotesService } from './services/notes.service';
import { NotesDataService } from './services/notes.data.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';

import { NotesComponent } from './components/notes.component';
import { NoteComponent } from './components/note.component/note.component';
import { AddButtonComponent } from './components/add-button/add.button.component';

import { Draggable } from '../shared';


@NgModule({
  imports: [CommonModule, NotesRoutingModule, SharedModule],
  declarations: [
      NotesComponent,
      NoteComponent,
      AddButtonComponent,
      Draggable
    ],
  exports: [NotesComponent, Draggable],
  providers: [NotesService, NotesDataService, NotesResolver]
})
export class NotesModule { }
