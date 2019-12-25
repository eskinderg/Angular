import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import * as NotesActions from '../actions/note';
import { NotesDataService } from '../components/notes/services/notes.data.service';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable()
export class NotesEffect {
  @Effect()
  save = this.actions$
    .ofType(NotesActions.CREATE_NOTE)
    .pipe(
      switchMap((action: NotesActions.CreateNote) =>
        this.notesApiService
          .addNote(action.payload)
          .pipe(
            map(note => new NotesActions.CreateNoteSuccess(note)),
            catchError(err => of(new NotesActions.CreateNoteFail(err)))
          )
      )
    )

  @Effect()
  updateNoteText: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_TEXT)
    .pipe(
      switchMap((action: NotesActions.UpdateNoteText) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => new NotesActions.UpdateNoteTextSuccess(note)),
            catchError(err => of(new NotesActions.UpdateNoteTextFail(err)))
          )
      )
    )

  @Effect()
  updateNotePosition: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_POSITION)
    .pipe(
      switchMap((action: NotesActions.UpdateNotePosition) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => new NotesActions.UpdateNotePositionSuccess(note)),
            catchError(err => of(new NotesActions.UpdateNotePositionFail(err)))
          )
      )
    )

  @Effect()
  updateNoteSize: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE_SIZE)
    .pipe(
      switchMap((action: NotesActions.UpdateNoteSize) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => new NotesActions.UpdateNoteSizeSuccess(note)),
            catchError(err => of(new NotesActions.UpdateNoteSizeFail(err)))
          )
      )
    )

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType(NotesActions.UPDATE_NOTE)
    .pipe(
      switchMap((action: NotesActions.UpdateNote) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => new NotesActions.UpdateNoteSuccess(note)),
            catchError(err => of(new NotesActions.CreateNoteFail(err)))
          )
      )
    )

  @Effect()
  fetch: Observable<Action> = this.actions$
    .ofType(NotesActions.FETCH_NOTES)
    .pipe(
      switchMap(() =>
        this.notesApiService
          .getNotes()
          .pipe(
            map(notes => new NotesActions.FetchNotesSuccess(notes)),
            catchError(err =>
              of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err })
            )
          )
      )
    )

  @Effect()
  delete = this.actions$
    .ofType(NotesActions.DELETE_NOTE)
    .pipe(
      switchMap((action: NotesActions.DeleteNote) =>
        this.notesApiService
          .deleteNote(action.payload)
          .pipe(
            map(note => new NotesActions.DeleteNoteSuccess(note)),
            catchError(err => of(new NotesActions.DeleteNoteFail(err)))
          )
      )
    )

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private notesApiService: NotesDataService
  ) {}
}
