import { createAction, props } from '@ngrx/store';
import { Note } from '../../models/note';

/*
 List of Notes messages
 */

export const createNote = createAction('[NOTE] CREATE_NOTE', props<{ note: Note }>());

export const createNoteFail = createAction('[NOTE] CREATE_NOTE_FAIL', props<{ payload: string }>());

export const createNoteSuccess = createAction('[NOTE] CREATE_NOTE_SUCCESS', props<{ note: Note }>());

export const updateNote = createAction('[NOTE] UPDATE_NOTE', props<{ note: Note }>());

export const updateLocalNoteSuccess = createAction(
    '[NOTE] UPDATE_LOCAL_NOTE_SUCCESS',
    props<{ localNote: Note }>()
);

export const updateLocalNoteFail = createAction(
    '[NOTE] UPDATE_LOCAL_NOTE_FAIL',
    props<{ payload: string }>()
);

export const syncNotes = createAction('[NOTE] SYNC_NOTES');

export const syncNotesStart = createAction('[NOTE] SYNC_NOTES_START');

export const syncNotesFail = createAction('[NOTE] SYNC_NOTES_FAIL', props<{ err: string }>());

export const syncNotesInProgress = createAction(
    '[NOTE] SYNC_NOTES_IN_PROGRESS',
    props<{ message: string }>()
);

export const getLocalNotesSuccess = createAction(
    '[NOTE] GET_LOCAL_NOTES_SUCCESS',
    props<{ localNotes: Note[] }>()
);

export const syncRemoteNotesResponse = createAction(
    '[NOTE] SYNC_REMOTE_NOTES_RESPONSE',
    props<{ remoteNotes: Note[] }>()
);

export const syncRemoteWithLocal = createAction(
    '[NOTE] SYNC_REMOTE_WITH_LOCAL',
    props<{ remoteNotes: Note[] }>()
);

export const syncRemoteWithLocalSuccess = createAction(
    '[NOTE] SYNC_REMOTE_WITH_LOCAL_SUCCESS',
    props<{ notes: Note[] }>()
);

export const syncServer = createAction('[NOTE] SYNC_SERVER');

export const syncServerFail = createAction('[NOTE] SYNC_SERVER_FAIL', props<{ err: string }>());

export const refreshNotes = createAction('[NOTE] REFRESH_NOTES');

export const refreshNotesFailed = createAction('[NOTE] REFRESH_NOTES_FAILURE', props<{ error: string }>());

// export const refreshNotesSuccess = createAction('[NOTE] REFRESH_NOTES_SUCCESS', props<{ notes: Note[] }>());

export const noteSelect = createAction('[NOTE] SELECT', props<{ note: Note }>());

export const noteSelectSuccess = createAction('[NOTE] SELECT_SUCCESS', props<{ note: Note }>());

export const noteSelectFail = createAction('[NOTE] SELECT_SUCCESS_FAIL', props<{ err: string }>());

export const unselectNote = createAction('[NOTE] UNSELECT_NOTE');

export const searchSelect = createAction('[NOTE] SEARCH_SELECT', props<{ selectedNote: Note }>());
