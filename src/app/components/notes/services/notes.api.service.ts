import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Note } from '../../../models/note';
import * as AppActions from '../../../store/actions';
import * as fromNotes from '../../../store/reducers/note.reducer';
import * as fromRoot from '../../../store/reducers';

@Injectable()
export class NoteApiService {
    constructor(private store: Store<fromRoot.IAppState>) {}

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
        this.run(AppActions.noteSelect({ payload: note }));
    }

    createNewNote(newNote: Note): void {
        this.run(AppActions.createNote({ payload: newNote }));
    }

    updateNote(note: Note): void {
        this.run(AppActions.updateNote({ payload: note }));
    }

    restoreNote(note: Note): void {
        this.run(AppActions.restoreNote({ payload: note }));
    }

    updateNoteText(note: Note): void {
        this.run(AppActions.updateNoteText({ payload: note }));
    }

    updateNoteHeader(note: Note): void {
        this.run(AppActions.updateNoteHeader({ payload: note }));
    }

    updateNoteSelection(note: Note): void {
        this.run(AppActions.updateNoteSelection({ payload: note }));
    }

    unselectNote(): void {
        this.run(AppActions.unselectNote());
    }

    restoreArchivedNote(note: Note): void {
        this.run(AppActions.restoreNote({ payload: note }));
    }

    archiveNote(note: Note): void {
        this.run(AppActions.archiveNote({ payload: { ...note, archived: true } }));
    }

    toggleSpellCheck(note: Note): void {
        this.run(AppActions.toggleSpellCheck({ payload: { ...note, spellCheck: !note.spellCheck } }));
    }

    updateNoteColour(note: Note): void {
        this.run(AppActions.updateNoteColour({ payload: note }));
    }

    deleteNote(note: Note): void {
        this.run(AppActions.deleteNote({ payload: { ...note, active: false } }));
    }

    changeNoteText(note: Note): void {
        this.run(AppActions.updateNoteText({ payload: note }));
    }

    updateNotePinOrder(note: Note): void {
        this.run(
            AppActions.updatePinOrder({
                payload: {
                    ...note,
                    pinned: !note.pinned
                }
            })
        );
    }

    changeNotePosition(note: Note): void {
        this.run(AppActions.updateNotePosition({ payload: note }));
    }

    changeNoteSize(note: Note): void {
        this.run(AppActions.updateNoteSize({ payload: note }));
    }

    private run(action: Action) {
        this.store.dispatch(action);
    }
}
