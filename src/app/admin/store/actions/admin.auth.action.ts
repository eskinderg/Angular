import { createAction, props } from '@ngrx/store';
import { Note } from 'src/app/models/note';

/**
 List of admin messages
 **/

// export const toggleDarkMode = createAction('[PREFERENCE] TOGGLE_DARK_MODE');

// export const toggleDarkModeSuccess = createAction('[PREFERENCE] TOGGLE_DARK_MODE_SUCCESS');

// export const getDarkMode = createAction('[PREFERENCE] GET_DARK_MODE');

// export const getDarkModeSuccess = createAction(
//     '[PREFERENCE] GET_DARK_MODE_SUCCESS',
//     props<{ isDarkMode: boolean }>()
// );

export const adminLogInSuccess = createAction('[ADMIN] LOG_IN_SUCCESS');

export const adminLogIn = createAction('[ADMIN] LOG_IN');

export const adminGetIsLoggedIn = createAction('[ADMIN] GET_IS_LOGGED_IN');

export const adminGetIsLoggedInSuccess = createAction(
    '[ADMIN] GET_IS_LOGGED_IN_SUCCESS',
    props<{ adminIsLoggedIn: boolean }>()
);

export const adminSetIsLoggedIn = createAction(
    '[ADMIN] SET_IS_LOGGED_IN',
    props<{ adminIsLoggedIn: boolean }>()
);

export const adminSetIsLoggedInSuccess = createAction(
    '[ADMIN] SET_IS_LOGGED_IN_SUCCESS',
    props<{ adminIsLoggedIn: boolean }>()
);

export const adminFetchNotes = createAction('[ADMIN] FETCH_NOTES');

export const adminFetchNotesFailed = createAction(
    '[ADMIN] FETCH_NOTES_FAILURE',
    props<{ payload: string }>()
);

export const adminFetchNotesSuccess = createAction(
    '[ADMIN] FETCH_NOTES_SUCCESS',
    props<{ payload: Note[] }>()
);

export const adminFetchUsers = createAction('[ADMIN] FETCH_USERS');

export const adminFetchUsersSuccess = createAction(
    '[ADMIN] FETCH_USERS_SUCCESS',
    props<{ payload: [string, string, number][] }>()
);

export const adminFetchUsersFailed = createAction(
    '[ADMIN] FETCH_USERS_FAILURE',
    props<{ payload: string }>()
);

export const adminRouteToHome = createAction('[ADMIN] ROUTE_TO_HOME');

export const adminUpdateNote = createAction('[ADMIN] UPDATE_NOTE', props<{ payload: Note }>());

export const adminUpdateNoteFail = createAction('[ADMIN] UPDATE_NOTE_FAIL', props<{ payload: string }>());

export const adminUpdateNoteSuccess = createAction('[ADMIN] UPDATE_NOTE_SUCCESS', props<{ payload: Note }>());

export const adminNoteSelect = createAction('[ADMIN] SELECT', props<{ payload: Note }>());

export const adminNoteUnSelect = createAction('[ADMIN] UNSELECT');

export const adminBulkUpdateNotes = createAction('[ADMIN] BULK_UPDATE_NOTES', props<{ payload: Note[] }>());

export const adminBulkUpdateNotesSuccess = createAction(
    '[ADMIN] BULK_UPDATE_NOTES_SUCCESS',
    props<{ payload: Note[] }>()
);
