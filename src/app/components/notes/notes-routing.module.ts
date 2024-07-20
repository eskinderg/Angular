import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth/auth-guard.service';
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
                canActivate: [AuthGuardService]
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
