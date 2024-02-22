import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as NotesActions from '../actions/note.actions';
import { NotesDataService } from '../../components/notes/services/notes.data.service';
import { ToastService } from '../../shared/toast/toast.service';

@Injectable()
export class NotesEffect {
  save = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createNote),
      switchMap(action =>
        this.notesDataService.addNote(action.payload).pipe(
          map(note => NotesActions.createNoteSuccess({ payload: note })),
          catchError(err => of(NotesActions.createNoteFail({ payload: err })))
        )
      )
    )
  );

  updateNoteText = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteText),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.updateNoteTextSuccess({ payload: note })),
          catchError(err => of(NotesActions.updateNoteTextFail({ payload: err })))
        )
      )
    )
  );

  updateNotePosition = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNotePosition),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.updateNotePositionSuccess({ payload: note })),
          catchError(err => of(NotesActions.updateNotePositionFail({ payload: err })))
        )
      )
    )
  );

  updateNoteSelection = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteSelection),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.updateNoteSelectionSuccess({ payload: note })),
          catchError(err => of(NotesActions.updateNoteSelectionFail({ payload: err })))
        )
      )
    )
  );

  update = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.updateNoteSuccess({ payload: note })),
          catchError(err => of(NotesActions.createNoteFail({ payload: err })))
        )
      )
    )
  );

  updatePinOrder = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updatePinOrder),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.updatePinOrderSuccess({ payload: note })),
          catchError(err => of(NotesActions.updatePinOrderFail({ payload: err })))
        )
      )
    )
  );

  fetchNotes = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.fetchNotes),
      switchMap(() => of(NotesActions.fetchNotesStart()))
    )
  );

  fetchNotesStart = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.fetchNotesStart),
      switchMap(() =>
        this.notesDataService.getNotes().pipe(
          map(notes => NotesActions.fetchNotesSuccess({ payload: notes })),
          catchError(err => of({ type: NotesActions.fetchNotesFailed.type, payload: err }))
        )
      )
    )
  );

  fetchNotesSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.fetchNotesSuccess),
      switchMap(() => of(NotesActions.fetchNotesComplete()))
    )
  );

  delete = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.deleteNoteSuccess({ payload: note })),
          catchError(err => of(NotesActions.deleteNoteFail({ payload: err })))
        )
      )
    )
  );

  deleteSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.deleteNoteSuccess),
        switchMap(() => {
          this.toastService.showSuccess('Note Deleted', 'Info');
          this.router.navigate([`/notes`]);
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  archiveNote = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.archiveNote),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.archiveNoteSuccess({ payload: note })),
          catchError(err => of(NotesActions.archiveNoteFail({ payload: err })))
        )
      )
    )
  );

  toggleSpellCheck = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.toggleSpellCheck),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => NotesActions.toggleSpellCheckSuccess({ payload: note })),
          catchError(err => of(NotesActions.toggleSpellCheckFail({ payload: err })))
        )
      )
    )
  );

  archiveNoteSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.archiveNoteSuccess),
        switchMap(() => {
          this.toastService.showSuccess('Note successfully archived', 'Info');
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  restoreNote = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.restoreNote),
      switchMap(action =>
        this.notesDataService.updateNote({ ...action.payload, archived: false }).pipe(
          map(note => NotesActions.restoreNoteSuccess({ payload: note })),
          catchError(err => of(NotesActions.restoreNoteFail({ payload: err })))
        )
      )
    )
  );

  restoreNoteSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NotesActions.restoreNoteSuccess),
        switchMap(() => {
          this.toastService.showSuccess('Note successfully restored', 'Info');
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  updateNoteColour = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteColour),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => {
            return NotesActions.updateNoteColourSuccess({ payload: note });
          }),
          catchError(err => of(NotesActions.updateNoteColourFail({ payload: err })))
        )
      )
    )
  );

  updateNoteColourSuccess = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteColourSuccess),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => {
            return NotesActions.updateOpendNote({ payload: note });
          }),
          catchError(err => of(NotesActions.updateNoteFail({ payload: err })))
        )
      )
    )
  );

  updateNoteHeader = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteHeader),
      switchMap(action =>
        this.notesDataService.updateNote(action.payload).pipe(
          map(note => {
            return NotesActions.updateNoteHeaderSuccess({ payload: note });
          }),
          catchError(err => of(NotesActions.updateNoteHeaderFail({ payload: err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private notesDataService: NotesDataService,
    private router: Router,
    private toastService: ToastService
  ) {}
}
