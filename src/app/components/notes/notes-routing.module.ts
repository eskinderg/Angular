import { Routes } from '@angular/router';
import { authGuard } from '../../auth/auth.guard';
import { NoteArchiveComponent } from './notes.archive/note.archive.component';
import { NotesComponent } from './main/notes.component';

export const notesRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'mynotes'
    },
    {
        path: 'mynotes',
        component: NotesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'archived',
        pathMatch: 'full',
        component: NoteArchiveComponent
    }
];
