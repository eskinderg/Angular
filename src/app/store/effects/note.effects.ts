import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import * as NotesActions from '../actions/note.actions';
import { NotesDataService } from '../../components/notes/services/notes.data.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Injectable()
export class NotesEffect {
    save = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.createNote),
            switchMap((action) =>
                notesDataService.addNote(action.payload).pipe(
                    map((note) => NotesActions.createNoteSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.createNoteFail({ payload: err })))
                )
            )
        )
    );

    updateNoteText = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updateNoteText),
            switchMap((action) =>
                notesDataService.updateNote(action.payload).pipe(
                    map((note) => NotesActions.updateNoteTextSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.updateNoteTextFail({ payload: err })))
                )
            )
        )
    );

    updateNotePosition = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.updateNotePosition),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => NotesActions.updateNotePositionSuccess({ payload: note })),
                        catchError((err) => of(NotesActions.updateNotePositionFail({ payload: err })))
                    )
                )
            )
    );

    updateNoteSelection = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.updateNoteSelection),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => NotesActions.updateNoteSelectionSuccess({ payload: note })),
                        catchError((err) => of(NotesActions.updateNoteSelectionFail({ payload: err })))
                    )
                )
            )
    );

    update = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updateNote),
            switchMap((action) =>
                notesDataService.updateNote(action.payload).pipe(
                    map((note) => NotesActions.updateNoteSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.createNoteFail({ payload: err })))
                )
            )
        )
    );

    updatePinOrder = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updatePinOrder),
            switchMap((action) =>
                notesDataService.updateNote(action.payload).pipe(
                    map((note) => NotesActions.updatePinOrderSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.updatePinOrderFail({ payload: err })))
                )
            )
        )
    );

    fetchNotes = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(NotesActions.fetchNotes),
            switchMap(() => of(NotesActions.fetchNotesStart()))
        )
    );

    fetchNotesStart = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.fetchNotesStart),
                switchMap(() =>
                    notesDataService.getNotes().pipe(
                        map((notes) => NotesActions.fetchNotesSuccess({ payload: notes })),
                        catchError((err) => of({ type: NotesActions.fetchNotesFailed.type, payload: err }))
                    )
                )
            )
    );

    fetchNotesSuccess = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(NotesActions.fetchNotesSuccess),
            switchMap(() => of(NotesActions.fetchNotesComplete()))
        )
    );

    refreshNotes = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.refreshNotes),
            switchMap(() =>
                notesDataService.getNotes().pipe(
                    map((notes) => NotesActions.refreshNotesSuccess({ payload: notes })),
                    catchError((err) => of(NotesActions.refreshNotesFailed({ payload: err })))
                )
            )
        )
    );

    delete = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.deleteNote),
            switchMap((action) =>
                notesDataService.updateNote(action.payload).pipe(
                    map((note) => NotesActions.deleteNoteSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.deleteNoteFail({ payload: err })))
                )
            )
        )
    );

    deleteSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(NotesActions.deleteNoteSuccess),
                switchMap(() => {
                    notificationService.showSuccess('Note Deleted', 'Info');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    archiveNote = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.archiveNote),
            switchMap((action) =>
                notesDataService.updateNote(action.payload).pipe(
                    map((note) => NotesActions.archiveNoteSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.archiveNoteFail({ payload: err })))
                )
            )
        )
    );

    toggleSpellCheck = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.toggleSpellCheck),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => NotesActions.toggleSpellCheckSuccess({ payload: note })),
                        catchError((err) => of(NotesActions.toggleSpellCheckFail({ payload: err })))
                    )
                )
            )
    );

    archiveNoteSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(NotesActions.archiveNoteSuccess),
                switchMap(() => {
                    notificationService.showSuccess('Note successfully archived', 'Info');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    restoreNote = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.restoreNote),
            switchMap((action) =>
                notesDataService.updateNote({ ...action.payload, archived: false }).pipe(
                    map((note) => NotesActions.restoreNoteSuccess({ payload: note })),
                    catchError((err) => of(NotesActions.restoreNoteFail({ payload: err })))
                )
            )
        )
    );

    restoreNoteSuccess = createEffect(
        (actions$ = inject(Actions), notificationService = inject(NotificationService)) =>
            actions$.pipe(
                ofType(NotesActions.restoreNoteSuccess),
                switchMap(() => {
                    notificationService.showSuccess('Note successfully restored', 'Info');
                    return EMPTY;
                })
            ),
        { dispatch: false }
    );

    updateNoteColour = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.updateNoteColour),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => {
                            return NotesActions.updateNoteColourSuccess({ payload: note });
                        }),
                        catchError((err) => of(NotesActions.updateNoteColourFail({ payload: err })))
                    )
                )
            )
    );

    updateNoteColourSuccess = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.updateNoteColourSuccess),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => {
                            return NotesActions.updateOpendNote({ payload: note });
                        }),
                        catchError((err) => of(NotesActions.updateNoteFail({ payload: err })))
                    )
                )
            )
    );

    updateNoteHeader = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.updateNoteHeader),
                switchMap((action) =>
                    notesDataService.updateNote(action.payload).pipe(
                        map((note) => {
                            return NotesActions.updateNoteHeaderSuccess({ payload: note });
                        }),
                        catchError((err) => of(NotesActions.updateNoteHeaderFail({ payload: err })))
                    )
                )
            )
    );
}
