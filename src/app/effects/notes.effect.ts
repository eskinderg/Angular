import { Router } from '@angular/router'
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as NotesActions from '../actions/note.action';
import { NotesDataService } from '../components/notes/services/notes.data.service';
import { ToastService } from '../shared/toast/toast.service';

@Injectable()
export class NotesEffect {
  save = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createNote),
      switchMap((action) =>
        this.notesApiService
          .addNote(action.payload)
          .pipe(
            map(note => NotesActions.createNoteSuccess({ payload: note })),
            catchError(err => of(NotesActions.createNoteFail({ payload: err })))
          ))))

  routeToNewNote = createEffect(() => this.actions$.pipe(
    ofType(NotesActions.createNoteSuccess),
    switchMap((action) =>
      this.router.navigate([`/notes/` + action.payload.id])
    )
  ), { dispatch: false })

  updateNoteText = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteText),
      switchMap((action) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => NotesActions.updateNoteTextSuccess({ payload: note })),
            catchError(err => of(NotesActions.updateNoteTextFail({ payload: err })))
          ))))

  updateNoteTextSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteTextSuccess),
      switchMap((action) =>
        this.notesApiService
          .getNote(action.payload.id)
          .pipe(
            map(note => NotesActions.getNoteUpdatedTimestampSuccess({ payload: note })),
            catchError(err => of(NotesActions.getNoteUpdatedTimestampFail({ payload: err })))
          ))))

  updateNotePosition = createEffect(() =>
    this.actions$
      .pipe(
        ofType(NotesActions.updateNotePosition),
        switchMap((action) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => NotesActions.updateNotePositionSuccess({ payload: note })),
              catchError(err => of(NotesActions.updateNotePositionFail({ payload: err })))
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
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      switchMap((action) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => NotesActions.updateNoteSuccess({ payload: note })),
            catchError(err => of(NotesActions.createNoteFail({ payload: err })))
          ))))

  updatePinOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updatePinOrder),
      switchMap((action) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => NotesActions.updatePinOrderSuccess({ payload: note })),
            catchError(err => of(NotesActions.updatePinOrderFail({ payload: err })))
          ))))

  fetch = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.fetchNotes),
      switchMap(() =>
        this.notesApiService
          .getNotes()
          .pipe(
            map(notes => NotesActions.fetchNotesSuccess({ payload: notes })),
            catchError(err =>
              of({ type: NotesActions.fetchNotesFailed.type, payload: err })
            )))))

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      switchMap((action) =>
        this.notesApiService
          .deleteNote(action.payload)
          .pipe(
            map(note => NotesActions.deleteNoteSuccess({ payload: note })),
            catchError(err => of(NotesActions.deleteNoteFail({ payload: err })))
          ))))

  deleteSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      switchMap(() => {
        this.toastService.showSuccess('Note Deleted', 'Info');
        this.router.navigate([`/notes`]);
        return EMPTY;
      }
      )), { dispatch: false })

  constructor(
    private actions$        : Actions,
    private notesApiService : NotesDataService,
    private router          : Router,
    private toastService    : ToastService
  ) { }
}
