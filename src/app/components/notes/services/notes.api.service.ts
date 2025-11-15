import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Note } from '../../../models/note';
import * as AppActions from '../../../store/actions';
import * as fromNotes from '../../../store/reducers/note.reducer';
import * as fromRoot from '../../../store/reducers';

@Injectable()
export class NoteApiService {
    private store = inject<Store<fromRoot.IAppState>>(Store);

    get Notes(): Observable<Note[]> {
        return this.store.select(fromNotes.getNotes);
    }

    get NoteAnimateState() {
        return this.store.select(fromNotes.getNotesAnimate);
    }

    get NotesLength(): Observable<number> {
        return this.store.select(fromNotes.getNotesLength);
    }

    get SelectedNote(): Observable<Note> {
        return this.store.select(fromNotes.getSelectedNote);
    }

    get OpendNote(): Observable<Note> {
        return this.store.select(fromNotes.getOpendNote);
    }

    get FacadeNote(): Observable<Note> {
        return this.store.select(fromNotes.getFacadeNote);
    }

    get IsSyncConflict(): Observable<boolean> {
        return this.store.select(fromNotes.getSyncConflict);
    }

    get IsSyncing(): Observable<boolean> {
        return this.store.select(fromNotes.getIsSyncing);
    }

    get ArchivedNotes(): Observable<Note[]> {
        return this.store.select(fromNotes.getArchivedNotes);
    }

    getNoteById(id: string): Observable<Note> {
        return this.store.select(fromNotes.getNoteById(id));
    }

    refreshNotes() {
        this.run(AppActions.refreshNotes());
    }

    selectNote(note: Note): void {
        this.run(AppActions.noteSelect({ note: note }));
    }

    createNewNote(newNote: Note): void {
        this.run(AppActions.createNote({ note: newNote }));
    }

    updateNote(note: Note): void {
        this.run(AppActions.updateNote({ note: { ...note, sync: false } }));
    }

    syncNotes(): void {
        this.run(AppActions.syncNotes());
    }

    unselectNote(): void {
        this.run(AppActions.unselectNote());
    }

    private run(action: Action) {
        this.store.dispatch(action);
    }
}
