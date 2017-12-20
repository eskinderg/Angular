import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';

import * as  NotesActions from '../actions/note';
import { NotesDataService } from '../components/notes/services/notes.data.service';

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
    .switchMap((action: NotesActions.createNote) =>
      this.notesApiService.addNote(action.payload)
        .map(note => new NotesActions.createNoteSuccess(note))
        .catch(err => Observable.of(new NotesActions.createNoteFail(err)))
    );

    @Effect()
    updateNoteText: Observable<Action> = this.actions$
      .ofType(NotesActions.UPDATE_NOTE_TEXT)
      .switchMap((action: NotesActions.updateNoteText) =>
        this.notesApiService.addNote(action.payload)
          .map(note => new NotesActions.updateNoteTextSuccess(note))
          .catch(err => Observable.of(new NotesActions.updateNoteTextFail(err)))
      );

      @Effect()
      updateNotePosition: Observable<Action> = this.actions$
        .ofType(NotesActions.UPDATE_NOTE_POSITION)
        .switchMap((action: NotesActions.updateNotePosition) =>
          this.notesApiService.addNote(action.payload)
            .map(note => new NotesActions.updateNotePositionSuccess(note))
            .catch(err => Observable.of(new NotesActions.updateNotePositionFail(err)))
        );

        @Effect()
        updateNoteSize: Observable<Action> = this.actions$
          .ofType(NotesActions.UPDATE_NOTE_SIZE)
          .switchMap((action: NotesActions.updateNoteSize) =>
            this.notesApiService.addNote(action.payload)
              .map(note => new NotesActions.updateNoteSizeSuccess(note))
              .catch(err => Observable.of(new NotesActions.updateNoteSizeFail(err)))
          );

          @Effect()
          update: Observable<Action> = this.actions$
            .ofType(NotesActions.UPDATE_NOTE)
            .switchMap((action: NotesActions.updateNote) =>
              this.notesApiService.addNote(action.payload)
                .map(note => new NotesActions.updateNoteSuccess(note))
                .catch(err => Observable.of(new NotesActions.createNoteFail(err)))
            );

            @Effect()
            fetch: Observable<Action> = this.actions$
              .ofType(NotesActions.FETCH_NOTES)
              .switchMap(() => this.notesApiService.getNotes()
                .map(notes => new NotesActions.fetchNotesSuccess(notes))
                .catch(err => Observable.of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err }))
              );

              @Effect()
              delete = this.actions$
                .ofType(NotesActions.DELETE_NOTE)
                .switchMap((action: NotesActions.deleteNote) =>
                  this.notesApiService.deleteNote(action.payload)
                    .map(note => new NotesActions.deleteNoteSuccess(note))
                    .catch(err => Observable.of(new NotesActions.deleteNoteFail(err)))
                );


                constructor(
                  private actions$: Actions,
                  private store: Store<any>,
                  private notesApiService: NotesDataService) { }


}
