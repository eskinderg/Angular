import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
// import { Observable } from 'rxjs';
// import { Store, Action } from '@ngrx/store';
import * as NotesActions from '../actions/note';
import { NotesDataService } from '../components/notes/services/notes.data.service';
import { catchError, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class NotesEffect {
  save = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.CREATE_NOTE),
        switchMap((action: NotesActions.CreateNote) =>
          this.notesApiService
            .addNote(action.payload)
            .pipe(
              map(note => new NotesActions.CreateNoteSuccess(note)),
              catchError(err => of(new NotesActions.CreateNoteFail(err)))
            ))))

  routeToNewNote = createEffect(() => this.actions$
    .pipe(ofType(NotesActions.CREATE_NOTE_SUCCESS),
      switchMap((action: NotesActions.CreateNoteSuccess) =>
        this.router.navigate([`/notes/` + action.payload.id])
      )
    ), { dispatch: false })

  updateNoteText = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.UPDATE_NOTE_TEXT),
        switchMap((action: NotesActions.UpdateNoteText) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => new NotesActions.UpdateNoteTextSuccess(note)),
              catchError(err => of(new NotesActions.UpdateNoteTextFail(err)))
            ))))

  updateNotePosition = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.UPDATE_NOTE_POSITION),
        switchMap((action: NotesActions.UpdateNotePosition) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => new NotesActions.UpdateNotePositionSuccess(note)),
              catchError(err => of(new NotesActions.UpdateNotePositionFail(err)))
            ))))

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

  update = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.UPDATE_NOTE),
        switchMap((action: NotesActions.UpdateNote) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => new NotesActions.UpdateNoteSuccess(note)),
              catchError(err => of(new NotesActions.CreateNoteFail(err)))
            ))))

  fetch = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.FETCH_NOTES),
        switchMap(() =>
          this.notesApiService
            .getNotes()
            .pipe(
              map(notes => new NotesActions.FetchNotesSuccess(notes)),
              catchError(err =>
                of({ type: NotesActions.FETCH_NOTES_FAILURE, payload: err })
              )))))

  delete = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.DELETE_NOTE),
        switchMap((action: NotesActions.DeleteNote) =>
          this.notesApiService
            .deleteNote(action.payload)
            .pipe(
              map(note => new NotesActions.DeleteNoteSuccess(note)),
              catchError(err => of(new NotesActions.DeleteNoteFail(err)))
            ))))

  deleteSuccess = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.DELETE_NOTE_SUCCESS),
        switchMap((action: NotesActions.DeleteNote) => {
          this.toastService.showStandard('Note Deleted', 'Info')
          return EMPTY;
        }
        )), { dispatch: false })

  constructor(
    private actions$: Actions,
    // private store: Store<any>,
    private notesApiService: NotesDataService,
    private router: Router,
    private toastService: ToastService
  ) { }
}
