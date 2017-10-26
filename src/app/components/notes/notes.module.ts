import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { NotesApiService } from './services/notes.api.service';
import { NotesDataService } from './services/notes.data.service';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesResolver } from './services/notes.resolver';

import { NotesComponent } from './components/notes.component';
import { NoteComponent } from './components/note.component/note.component';
import { AddButtonComponent } from './components/add-button/add.button.component';

import { Draggable } from '../shared';
import { NotesActions } from './notes.actions';
import { NotesEffect } from './state/notes.effect';
import { notes } from './state/notes.reducer';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule,
    StoreModule.provideStore({ notes }),
    EffectsModule.run(NotesEffect)
  ],
  declarations: [
    NotesComponent,
    NoteComponent,
    AddButtonComponent,
    Draggable
  ],
  exports: [NotesComponent, Draggable],
  providers: [NotesApiService, NotesDataService, NotesResolver, NotesActions]
})
export class NotesModule { }
