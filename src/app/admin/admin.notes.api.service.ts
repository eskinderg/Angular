import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Note } from '..//models/note';
import * as AdminActions from '../admin/store/actions/admin.auth.action';
import * as fromAdminNotes from './store/reducers/admin.reducer';
import * as fromRoot from '../store/reducers';
import { User } from './models/user';

@Injectable()
export class AdminNoteApiService {
    private store = inject<Store<fromRoot.IAppState>>(Store);

    get Notes(): Observable<Note[]> {
        return this.store.select(fromAdminNotes.getAdminNotes);
    }

    get Users(): Observable<User[]> {
        return this.store.select(fromAdminNotes.getAdminUsers);
    }

    get TotalNotesCount(): Observable<number> {
        return this.store.select(fromAdminNotes.getAdminNotesTotalCount);
    }

    updateNote(note: Note): void {
        this.run(AdminActions.adminUpdateNote({ payload: note }));
    }

    selectNote(note: Note): void {
        this.run(AdminActions.adminNoteSelect({ payload: note }));
    }

    unSelectNote(): void {
        this.run(AdminActions.adminNoteUnSelect());
    }

    get SelectedNote(): Observable<Note> {
        return this.store.select(fromAdminNotes.getAdminSelectedNote);
    }

    get UsersInfo(): Observable<
        { owner: string; user_id: string; total_notes: number; active_notes: number }[]
    > {
        return this.store.select(fromAdminNotes.getAdminUsersInfo);
    }

    bulkUpdateNotes(notes: Note[]): void {
        // return null; //this.http.post<void>('/api/notes/bulk-update', { notes });
        return this.run(AdminActions.adminBulkUpdateNotes({ payload: notes }));
    }

    bulkUpdateUsers(users: User[]): void {
        return this.run(AdminActions.adminBulkUpdateUsers({ payload: users }));
    }

    private run(action: Action) {
        this.store.dispatch(action);
    }
}
