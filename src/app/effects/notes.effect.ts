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
    this.actions$.pipe(
      ofType(NotesActions.createNote),
      switchMap((action) =>
        this.notesApiService
          .addNote(action.payload)
          .pipe(
            map(note => NotesActions.createNoteSuccess({ payload: note })),
            catchError(err => of(NotesActions.createNoteFail(err)))
          ))))

  routeToNewNote = createEffect(() => this.actions$.pipe(
    ofType(NotesActions.createNoteSuccess),
    switchMap((action) =>
      this.router.navigate([`/notes/` + action.payload.id])
    )
  ), { dispatch: false })

  updateNoteText = createEffect(() =>
    this.actions$.pipe(ofType(NotesActions.updateNoteText),
      switchMap((action) =>
        this.notesApiService
          .updateNote(action.payload)
          .pipe(
            map(note => NotesActions.updateNoteTextSuccess({ payload: note })),
            catchError(err => of(NotesActions.updateNoteTextFail(err)))
          ))))

  updateNotePosition = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.updateNotePosition),
        switchMap((action) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => NotesActions.updateNotePositionSuccess({ payload: note })),
              catchError(err => of(NotesActions.updateNotePositionFail(err)))
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
      .pipe(ofType(NotesActions.updateNote),
        switchMap((action) =>
          this.notesApiService
            .updateNote(action.payload)
            .pipe(
              map(note => NotesActions.updateNoteSuccess({ payload: note })),
              catchError(err => of(NotesActions.createNoteFail(err)))
            ))))

  fetch = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.fetchNotes),
        switchMap(() =>
          this.notesApiService
            .getNotes()
            .pipe(
              map(notes => NotesActions.fetchNotesSuccess({ payload: notes })),
              catchError(err =>
                of({ type: NotesActions.fetchNotesFailed.type, payload: err })
              )))))

  delete = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.deleteNote),
        switchMap((action) =>
          this.notesApiService
            .deleteNote(action.payload)
            .pipe(
              map(note => NotesActions.deleteNoteSuccess({ payload: note })),
              catchError(err => of(NotesActions.deleteNoteFail(err)))
            ))))

  deleteSuccess = createEffect(() =>
    this.actions$
      .pipe(ofType(NotesActions.deleteNoteSuccess),
        switchMap(() => {
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
