import { inject, Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as NotesActions from '../../../../app/store/actions/note.actions';
// import { NotificationService } from '../../../../app/shared/notification/notification.service';
import { AdminNotesDataService } from 'src/app/admin/notes.data.service';
import * as AdminActions from '../actions/admin.auth.action';

@Injectable()
export class AdminEffect {
    adminFetchNotes = createEffect(
        (actions$ = inject(Actions), adminNotesDataService = inject(AdminNotesDataService)) =>
            actions$.pipe(
                ofType(AdminActions.adminFetchNotes),
                switchMap(() =>
                    adminNotesDataService.getNotes().pipe(
                        map((notes) => AdminActions.adminFetchNotesSuccess({ payload: notes })),
                        catchError((err) =>
                            of({ type: AdminActions.adminFetchNotesFailed.type, payload: err })
                        )
                    )
                )
            )
    );

    adminFetchUsers = createEffect(
        (actions$ = inject(Actions), adminNotesDataService = inject(AdminNotesDataService)) =>
            actions$.pipe(
                ofType(AdminActions.adminFetchUsers),
                switchMap(() =>
                    adminNotesDataService.getUsers().pipe(
                        map((users) => AdminActions.adminFetchUsersSuccess({ payload: users })),
                        catchError((err) =>
                            of({ type: AdminActions.adminFetchUsersFailed.type, payload: err })
                        )
                    )
                )
            )
    );

    adminFetchUsersSuccess = createEffect(
        (actions$ = inject(Actions), adminNotesDataService = inject(AdminNotesDataService)) =>
            actions$.pipe(
                ofType(AdminActions.adminFetchUsersSuccess),
                switchMap(() =>
                    adminNotesDataService.getNotes().pipe(
                        map((notes) => AdminActions.adminFetchNotesSuccess({ payload: notes })),
                        catchError((err) => of(AdminActions.adminFetchNotesFailed({ payload: err.message })))
                    )
                )
            )
    );

    adminUpdateNote = createEffect(
        (actions$ = inject(Actions), adminNotesDataService = inject(AdminNotesDataService)) =>
            actions$.pipe(
                ofType(AdminActions.adminUpdateNote),
                switchMap((action) =>
                    adminNotesDataService.updateNote(action.payload).pipe(
                        switchMap((note) =>
                            of(
                                NotesActions.fetchNotes(),
                                AdminActions.adminFetchNotes(),
                                AdminActions.adminUpdateNoteSuccess({ payload: note })
                            )
                        ),
                        catchError((err) => of(AdminActions.adminUpdateNoteFail({ payload: err })))
                    )
                )
            )
    );

    adminBulkUpdateNotes = createEffect(
        (actions$ = inject(Actions), adminNotesDataService = inject(AdminNotesDataService)) =>
            actions$.pipe(
                ofType(AdminActions.adminBulkUpdateNotes),
                switchMap((action) =>
                    adminNotesDataService.bulkUpdateNotes(action.payload).pipe(
                        map((updatedNotes) =>
                            AdminActions.adminBulkUpdateNotesSuccess({ payload: updatedNotes })
                        ),
                        catchError((err) => of({ type: '[ADMIN] BULK_UPDATE_NOTES_FAILURE', payload: err }))
                    )
                )
            )
    );

    // fetchNotesSuccess = createEffect((actions$ = inject(Actions)) =>
    //     actions$.pipe(
    //         ofType(NotesActions.fetchNotesSuccess),
    //         switchMap(() => of(NotesActions.fetchNotesComplete()))
    //     )
    // );
}
