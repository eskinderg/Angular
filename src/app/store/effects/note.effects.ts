import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map, exhaustMap, mergeMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';
import * as fromRoot from '../reducers';
import * as NotesActions from '../actions/note.actions';
import { NotesDataService } from '../../components/notes/services/notes.data.service';
import { NoteLocalDbService } from 'src/app/components/notes/services/notes.db.service';
import { Note } from 'src/app/models/note';
import { Store } from '@ngrx/store';

@Injectable()
export class NotesEffect {
    createNote$ = createEffect((actions$ = inject(Actions), noteDbService = inject(NoteLocalDbService)) =>
        actions$.pipe(
            ofType(NotesActions.createNote),
            switchMap((action) =>
                from(noteDbService.upsertNote(action.note)).pipe(
                    map((note) => NotesActions.createNoteSuccess({ note: note })),
                    catchError((err) => of(NotesActions.createNoteFail({ payload: err })))
                )
            )
        )
    );

    createNoteSuccess$ = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(NotesActions.createNoteSuccess),
            switchMap(() => of(NotesActions.syncNotes())),
            catchError((err) => of(NotesActions.syncNotesFail({ err: err })))
        )
    );

    noteSelect$ = createEffect((actions$ = inject(Actions), noteDbService = inject(NoteLocalDbService)) =>
        actions$.pipe(
            ofType(NotesActions.noteSelect),
            switchMap((action) =>
                from(noteDbService.getNoteById(action.note.note_id)).pipe(
                    map((note) => NotesActions.noteSelectSuccess({ note: note })),
                    catchError((error) => of(NotesActions.noteSelectFail({ err: error })))
                )
            )
        )
    );

    updateNote$ = createEffect((actions$ = inject(Actions), noteDbService = inject(NoteLocalDbService)) =>
        actions$.pipe(
            ofType(NotesActions.updateNote),
            mergeMap((action) =>
                from(noteDbService.upsertNote(action.note)).pipe(
                    map((note: Note) => NotesActions.updateLocalNoteSuccess({ localNote: note })),
                    catchError((error) => of(NotesActions.updateLocalNoteFail({ payload: error })))
                )
            )
        )
    );

    syncServer$ = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(NotesActions.syncServer),
            switchMap(() => of(NotesActions.syncNotes()))
        )
    );

    syncNotes$ = createEffect(
        (actions$ = inject(Actions), store = inject<Store<fromRoot.IAppState>>(Store)) =>
            actions$.pipe(
                ofType(NotesActions.syncNotes),
                withLatestFrom(store.select(fromRoot.getIsSyncing)),
                withLatestFrom(store.select(fromRoot.getSyncConflict)),
                exhaustMap(([[_action, isSyncing], isSyncConflict]) =>
                    isSyncing || isSyncConflict
                        ? of(NotesActions.syncNotesInProgress({ message: 'Sync currently is in progress' }))
                        : of(NotesActions.syncNotesStart())
                )
            )
    );

    syncNotesStart$ = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.syncNotesStart),
                switchMap(() =>
                    notesDataService
                        .getNotes()
                        .pipe(
                            switchMap((response: Note[]) =>
                                of(NotesActions.syncRemoteNotesResponse({ remoteNotes: response }))
                            )
                        )
                )
            )
    );

    syncNotesReponse$ = createEffect(
        (
            actions$ = inject(Actions),
            noteDbService = inject(NoteLocalDbService),
            store = inject<Store<fromRoot.IAppState>>(Store)
        ) =>
            actions$.pipe(
                ofType(NotesActions.syncRemoteNotesResponse),
                withLatestFrom(store.select(fromRoot.getSyncConflict)),
                exhaustMap(([action, isConflict]) =>
                    isConflict
                        ? of(NotesActions.syncNotesFail({ err: 'Sync conflict occured' }))
                        : from(noteDbService.syncNotes(action.remoteNotes)).pipe(
                              switchMap(() =>
                                  from(noteDbService.getAllNotes()).pipe(
                                      map((localNotes: Note[]) =>
                                          NotesActions.getLocalNotesSuccess({ localNotes: localNotes })
                                      )
                                  )
                              ),
                              catchError((err) => of(NotesActions.syncNotesFail({ err: err })))
                          )
                )
            )
    );

    getLocalNotesSuccess$ = createEffect(
        (actions$ = inject(Actions), notesDataService = inject(NotesDataService)) =>
            actions$.pipe(
                ofType(NotesActions.getLocalNotesSuccess),
                switchMap((action) =>
                    notesDataService.upsertNotes(action.localNotes).pipe(
                        switchMap((response: Note[]) =>
                            of(NotesActions.syncRemoteWithLocal({ remoteNotes: response }))
                        ),
                        catchError((err) => {
                            if (err.status === 403)
                                return of(
                                    NotesActions.syncRemoteWithLocal({ remoteNotes: action.localNotes })
                                );
                            return EMPTY;
                        })
                    )
                )
            )
    );

    syncRemoteWithLocal$ = createEffect(
        (actions$ = inject(Actions), notesDbService = inject(NoteLocalDbService)) =>
            actions$.pipe(
                ofType(NotesActions.syncRemoteWithLocal),
                mergeMap((action) =>
                    from(notesDbService.syncRemoteWithLocal(action.remoteNotes)).pipe(
                        map((localNotes: Note[]) =>
                            NotesActions.syncRemoteWithLocalSuccess({ notes: localNotes })
                        )
                    )
                )
            )
    );

    refreshNotes$ = createEffect((actions$ = inject(Actions)) =>
        actions$.pipe(
            ofType(NotesActions.refreshNotes),
            switchMap(() => of(NotesActions.syncNotes())),
            catchError((err) => of(NotesActions.refreshNotesFailed({ error: err })))
        )
    );
}
