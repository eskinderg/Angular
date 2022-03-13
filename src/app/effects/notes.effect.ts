import { Injectable } from '@angular/core';
import { ofType, Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Store, Action } from '@ngrx/store';
import * as NotesActions from '../actions/note';
import { NotesDataService } from '../components/notes/services/notes.data.service';
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable()
export class NotesEffect {
  @Effect()
  save = this.actions$
    .pipe(ofType(NotesActions.CREATE_NOTE),
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
    .pipe(ofType(NotesActions.UPDATE_NOTE_TEXT),
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
    .pipe(ofType(NotesActions.UPDATE_NOTE_POSITION),
      switchMap((action: NotesActions.UpdateNotePosition) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => new NotesActions.UpdateNotePositionSuccess(note)),
            catchError(err => of(new NotesActions.UpdateNotePositionFail(err)))
          )
      )
    )

  // @Effect()
  // updateNoteSize: Observable<Action> = this.actions$
  //   .pipe(ofType(NotesActions.UPDATE_NOTE_SIZE),
  //     switchMap((action: NotesActions.UpdateNoteSize) =>
  //       this.notesApiService
  //         .updateNote(action.payload)
  //         .pipe(
  //           map(note => new NotesActions.UpdateNoteSizeSuccess(note)),
  //           catchError(err => of(new NotesActions.UpdateNoteSizeFail(err)))
  //         )
  //     )
  //   )

  @Effect()
  update: Observable<Action> = this.actions$
    .pipe(ofType(NotesActions.UPDATE_NOTE),
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
    .pipe(ofType(NotesActions.FETCH_NOTES),
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
    .pipe(ofType(NotesActions.DELETE_NOTE),
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
