import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { NotesComponent } from './components/notes.component';
// import { NotesResolver } from './services/notes.resolver';
import { NoteResolver } from '../notes/components/note.component/note.resolve';
// import { NotesApiService } from './services/notes.api.service';
import { NoteComponent } from './components/note.component/note.component';
import { NoteDialogWrapperComponent } from './components/note-dialog/note-dialog-wrapper/note-dialog-wrapper.component';
import { NoteDetailDialogComponent as NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NoteArchiveComponent } from './components/note.archive/note.archive.component';
import { NoteArchiveWrapperComponent } from './components/note.archive/note-archive-wrapper/note-archive-wrapper.component';

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
          // {
          //   path: 'archive',
          //   pathMatch: "full",
          //   component: NoteArchiveComponent,
          // },
          {
            path: 'dialog',
            pathMatch: "full",
            // outlet: 'dialog',
            component: NoteDialogWrapperComponent,
            data: {
              component: NoteDialogComponent
            }
          },
          {
            path: 'archive',
            pathMatch: "full",
            // outlet: 'dialog',
            component: NoteDialogWrapperComponent,
            data: {
              component: NoteArchiveComponent
            }
          },
        ]
      }
    ])
  ],
  // providers: [NotesApiService],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
