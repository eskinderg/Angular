import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import { NotesActions } from '../notes.actions';
import { NotesDataService } from '../services/notes.data.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class NotesEffect {

    @Effect()
    save = this.actions$
        .ofType(NotesActions.CREATE_NOTE)
        .switchMap(({ payload }) =>
            this.notesApiService.addNote(payload.note)
                .map(note => this.noteActions.createNoteSuccess(note))
                .catch(err => Observable.of(this.noteActions.createNoteFail(err)))
        );

    @Effect()
    update: Observable<Action> = this.actions$
        .ofType(NotesActions.UPDATE_NOTE)
        .switchMap(({ payload }) =>
            this.notesApiService.addOrUpdateNote(payload.changes)
                .map(note => this.noteActions.updateNoteSuccess(note))
                .catch(err => Observable.of(this.noteActions.createNoteFail(err)))
        );

    @Effect()
    fetch: Observable<Action> = this.actions$
        .ofType(NotesActions.FETCH_NOTES)
        .switchMap(() => this.notesApiService.getNotes()
            .map(notes => this.noteActions.fetchNotesSuccess(notes))
            .catch(err => Observable.of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err }))
        );

    @Effect()
    delete = this.actions$
        .ofType(NotesActions.DELETE_NOTE)
        .switchMap(({ payload }) =>
            this.notesApiService.deleteNoteById(payload.id)
                .map(note => this.noteActions.deleteNoteSuccess(note))
                .catch(err => Observable.of(this.noteActions.deleteNoteFail(err)))
        );


    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private notesApiService: NotesDataService,
        private noteActions: NotesActions) { }


}
