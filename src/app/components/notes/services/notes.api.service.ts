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
        this.run(AppActions.updateNote({ note: note }));
    }

    restoreNote(note: Note): void {
        this.run(AppActions.restoreNote({ note: note }));
    }

    updateNoteText(note: Note): void {
        this.run(AppActions.updateNoteText({ note: note }));
    }

    updateNoteHeader(note: Note): void {
        this.run(AppActions.updateNoteHeader({ note: note }));
    }

    updateNoteSelection(note: Note): void {
        this.run(AppActions.updateNoteSelection({ note: note }));
    }

    unselectNote(): void {
        this.run(AppActions.unselectNote());
    }

    restoreArchivedNote(note: Note): void {
        this.run(AppActions.restoreNote({ note: note }));
    }

    archiveNote(note: Note): void {
        this.run(AppActions.archiveNote({ note: { ...note, archived: true } }));
    }

    toggleSpellCheck(note: Note): void {
        this.run(AppActions.toggleSpellCheck({ note: { ...note, spellCheck: !note.spellCheck } }));
    }

    updateNoteColour(note: Note): void {
        this.run(AppActions.updateNoteColour({ note: note }));
    }

    deleteNote(note: Note): void {
        this.run(AppActions.deleteNote({ note: { ...note, active: false } }));
    }

    changeNoteText(note: Note): void {
        this.run(AppActions.updateNoteText({ note: note }));
    }

    updateNotePinOrder(note: Note): void {
        this.run(
            AppActions.updatePinOrder({
                note: {
                    ...note,
                    pinned: !note.pinned
                }
            })
        );
    }

    changeNotePosition(note: Note): void {
        this.run(AppActions.updateNotePosition({ note: note }));
    }

    changeNoteSize(note: Note): void {
        this.run(AppActions.updateNoteSize({ note: note }));
    }

    private run(action: Action) {
        this.store.dispatch(action);
    }
}
