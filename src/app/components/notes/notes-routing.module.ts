import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
import { NoteDialogWrapperComponent } from './components/note-dialog/note-dialog-wrapper/note-dialog-wrapper.component';
import { NoteDetailDialogComponent as NoteDialogComponent } from './components/note-dialog/note-dialog.component';
import { NoteArchiveComponent } from './notes.archive/note.archive.component';
import { NotesComponent } from './main/notes.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'mynotes'
            },
            {
                path: 'mynotes',
                component: NotesComponent,
                canActivate: [AuthGuardService],
                children: [
                    {
                        path: 'dialog',
                        pathMatch: 'full',
                        component: NoteDialogWrapperComponent,
                        data: {
                            component: NoteDialogComponent
                        }
                    }
                ]
            },
            {
                path: 'archived',
                pathMatch: 'full',
                component: NoteArchiveComponent
            }
        ])
    ],
    exports: [RouterModule]
})
export class NotesRoutingModule {}
