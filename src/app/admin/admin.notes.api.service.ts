import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Note } from '..//models/note';
import * as AdminActions from '../admin/store/actions/admin.auth.action';
import * as fromAdminNotes from './store/reducers/admin.notes.reducer';
import * as fromRoot from '../store/reducers';

@Injectable()
export class AdminNoteApiService {
    constructor(private store: Store<fromRoot.IAppState>) {}

    get Notes(): Observable<Note[]> {
        return this.store.select(fromAdminNotes.getAdminNotes);
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

    get Users(): Observable<object[]> {
        return this.store.select(fromAdminNotes.getAdminUsers);
    }

    private run(action: Action) {
        this.store.dispatch(action);
    }
}
