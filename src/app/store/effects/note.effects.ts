import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map, withLatestFrom, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { EMPTY, of } from 'rxjs';
import * as NotesActions from '../actions/note.actions';
import * as fromRoot from '../../store/reducers';
import { NotesDataService } from '../../components/notes/services/notes.data.service';
import { NotificationService } from '../../shared/notification/notification.service';

@Injectable()
export class NotesEffect {
    save = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.createNote),
            switchMap((action) =>
                notesDataService.upsertNotes([action.note]).pipe(
                    map((note) => NotesActions.createNoteSuccess({ note: note.shift() })),
                    catchError((err) => of(NotesActions.createNoteFail({ payload: err })))
                )
            )
        )
    );

    updateNoteText = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updateNoteText),
            switchMap((action) =>
                notesDataService.upsertNotes([action.note]).pipe(
                    map((notes) => NotesActions.updateNoteTextSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => NotesActions.updateNotePositionSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => NotesActions.updateNoteSelectionSuccess({ note: notes.shift() })), // Use the first note from the returned list
                        catchError((err) => of(NotesActions.updateNoteSelectionFail({ payload: err })))
                    )
                )
            )
    );

    update = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updateNote),
            switchMap((action) =>
                notesDataService.upsertNotes([action.note]).pipe(
                    map((notes) => NotesActions.updateNoteSuccess({ note: notes.shift() })), // Use the first note from the returned list
                    catchError((err) => of(NotesActions.updateNoteFail({ payload: err })))
                )
            )
        )
    );

    updatePinOrder = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.updatePinOrder),
            switchMap((action) =>
                notesDataService.upsertNotes([action.note]).pipe(
                    map((notes) => NotesActions.updatePinOrderSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                        map((notes) => NotesActions.fetchNotesSuccess({ notes: notes })),
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
                    map((notes) => NotesActions.checkNoteConflict({ notes: notes })),
                    catchError((err) => of(NotesActions.refreshNotesFailed({ payload: err })))
                )
            )
        )
    );

    checkNoteConflict = createEffect(
        (
            actions$ = inject(Actions),
            notificationService = inject(NotificationService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(NotesActions.checkNoteConflict),
                withLatestFrom(store.select(fromRoot.getFacadeNote)),
                exhaustMap(([action, facadeNote]) => {
                    const note = action.notes.find((n) => n.id === facadeNote.id);
                    if (note !== undefined) {
                        if (facadeNote.dateModified < note.dateModified) {
                            notificationService.showWarning(
                                "There where changes made that are not in sync with the server. Please reload your page to fetch the latest data or your changes won't be saved",
                                'Sync Operation',
                                5000,
                                true,
                                false
                            );
                            return EMPTY;
                        }
                    }
                    return of(NotesActions.refreshNotesSuccess({ notes: action.notes }));
                })
            )
    );

    delete = createEffect((actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
        actions$.pipe(
            ofType(NotesActions.deleteNote),
            switchMap((action) =>
                notesDataService.upsertNotes([action.note]).pipe(
                    map((notes) => NotesActions.deleteNoteSuccess({ note: notes.shift() })),
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
                notesDataService.upsertNotes([action.note]).pipe(
                    map((notes) => NotesActions.archiveNoteSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => NotesActions.toggleSpellCheckSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                notesDataService.upsertNotes([{ ...action.note, archived: false }]).pipe(
                    map((notes) => NotesActions.restoreNoteSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => NotesActions.updateNoteColourSuccess({ note: notes.shift() })), // Use the first note from the returned list
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => {
                            return NotesActions.updateOpendNote({ note: notes.shift() });
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
                    notesDataService.upsertNotes([action.note]).pipe(
                        map((notes) => NotesActions.updateNoteHeaderSuccess({ note: notes.shift() })), // Use the first note from the returned list
                        catchError((err) => of(NotesActions.updateNoteHeaderFail({ payload: err })))
                    )
                )
            )
    );
}
