import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { NotesComponent } from './components/notes.component';
// import { NotesResolver } from './services/notes.resolver';
import { NoteResolver } from '../notes/components/note.component/note.resolve';
// import { NotesApiService } from './services/notes.api.service';
import { NoteComponent } from './components/note.component/note.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NotesComponent,
        canActivate: [AuthGuardService],
        resolve: {
          // notes: NotesResolver
        },
        children: [
          {
            path: ':id',
            component: NoteComponent,
            resolve: {
              note: NoteResolver
            }
          }
        ]
      }
    ])
  ],
  // providers: [NotesApiService],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
