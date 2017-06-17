
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesService } from './services/notes.service';
import { NotesDataService } from './services/notes.data.service';
import { NotesRoutingModule } from './notes-routing.module';

import { NotesComponent } from './components/notes.component';
import { NoteComponent } from  './components/note.component/note.component';
import { AddButtonComponent } from './components/add-button/add.button.component';

import { Draggable } from '../shared';


// import { AboutUsComponent } from './about-us/aboutus.component';
// import { ProfileComponent } from './profile/profile.component';
// import { FeatureComponent } from './feature/feature.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, NotesRoutingModule, SharedModule],
  declarations: [
      NotesComponent,
      NoteComponent,
      AddButtonComponent,
      Draggable
      // AboutUsComponent,
      // ProfileComponent,
      // FeatureComponent
    ],
  exports: [NotesComponent, Draggable],
  providers: [NotesService, NotesDataService]
})
export class NotesModule { }
