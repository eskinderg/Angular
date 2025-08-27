import { createAction, props } from '@ngrx/store';
import { Note } from '../../models/note';

/*
 List of notes messages
 */

// ===================================
//  CREATE NEW NOTE
// -----------------------------------

export const createNewNote = createAction('[NOTE] CREATE_NEW_NOTE', props<{ note: Note }>());

export const createNewNoteFail = createAction('[NOTE] CREATE_NEW_NOTE_FAIL', props<{ payload: string }>());

export const createNewNoteSuccess = createAction('[NOTE] CREATE_NEW_NOTE_SUCCESS', props<{ note: Note }>());

// ===================================
//  CREATE
// -----------------------------------

export const createNote = createAction('[NOTE] CREATE_NOTE', props<{ note: Note }>());

export const createNoteFail = createAction('[NOTE] CREATE_NOTE_FAIL', props<{ payload: string }>());

export const createNoteSuccess = createAction('[NOTE] CREATE_NOTE_SUCCESS', props<{ note: Note }>());

// ===================================
//  DELETE
// -----------------------------------

export const deleteNote = createAction('[NOTE] DELETE_NOTE', props<{ note: Note }>());

export const deleteNoteFail = createAction('[NOTE] DELETE_NOTE_FAIL', props<{ payload: string }>());

export const deleteNoteSuccess = createAction('[NOTE] DELETE_NOTE_SUCCESS', props<{ note: Note }>());

// ===================================
//  FETCH
// -----------------------------------

export const fetchNotes = createAction('[NOTE] FETCH_NOTES');

export const fetchNotesFailed = createAction('[NOTE] FETCH_NOTES_FAILURE', props<{ payload: string }>());

export const fetchNotesSuccess = createAction('[NOTE] FETCH_NOTES_SUCCESS', props<{ notes: Note[] }>());

// ===================================
//  UPDATE
// -----------------------------------

// ===================================
//  REFRESH
// -----------------------------------
export const refreshNotes = createAction('[NOTE] REFRESH_NOTES');

export const refreshNotesFailed = createAction('[NOTE] REFRESH_NOTES_FAILURE', props<{ payload: string }>());

export const refreshNotesSuccess = createAction('[NOTE] REFRESH_NOTES_SUCCESS', props<{ notes: Note[] }>());

export const updateNoteText = createAction('[NOTE] UPDATE_NOTE_TEXT', props<{ note: Note }>());

export const updateNoteTextSuccess = createAction('[NOTE] UPDATE_NOTE_TEXT_SUCCESS', props<{ note: Note }>());

export const updateNoteTextFail = createAction('[NOTE] UPDATE_NOTE_TEXT_FAIL', props<{ payload: string }>());

export const updateNoteHeader = createAction('[NOTE] UPDATE_NOTE_HEADER', props<{ note: Note }>());

export const updateNoteHeaderSuccess = createAction(
    '[NOTE] UPDATE_NOTE_HEADER_SUCCESS',
    props<{ note: Note }>()
);

export const updateNoteHeaderFail = createAction(
    '[NOTE] UPDATE_NOTE_HEADER_FAIL',
    props<{ payload: string }>()
);

export const updateNote = createAction('[NOTE] UPDATE_NOTE', props<{ note: Note }>());

export const updateNoteFail = createAction('[NOTE] UPDATE_NOTE_FAIL', props<{ payload: string }>());

export const updateNoteSuccess = createAction('[NOTE] UPDATE_NOTE_SUCCESS', props<{ note: Note }>());

export const updateNotePosition = createAction('[NOTE] UPDATE_NOTE_POSITION', props<{ note: Note }>());

export const updateNotePositionSuccess = createAction(
    '[NOTE] UPDATE_NOTE_POSITION_SUCCESS',
    props<{ note: Note }>()
);

export const updateNotePositionFail = createAction(
    '[NOTE] UPDATE_NOTE_POSITION_FAIL',
    props<{ payload: string }>()
);

export const updateNoteSize = createAction('[NOTE] UPDATE_NOTE_SIZE', props<{ note: Note }>());

export const updateNoteSizeSuccess = createAction('[NOTE] UPDATE_NOTE_SIZE_SUCCESS', props<{ note: Note }>());

export const updateNoteSizeFail = createAction('[NOTE] UPDATE_NOTE_SIZE_FAIL', props<{ payload: string }>());

//--- GET

export const getNote = createAction('[NOTE] GET_NOTE', props<{ note: Note }>());

export const getNoteFail = createAction('[NOTE] GET_NOTE_FAIL', props<{ payload: string }>());

export const getNoteSuccess = createAction('[NOTE] GET_NOTE_SUCCESS', props<{ note: Note }>());

export const getNoteUpdatedTimeStamp = createAction(
    '[NOTE] GET_NOTE_UPDATED_TIMESTAMP',
    props<{ note: Note }>()
);

export const getNoteUpdatedTimestampSuccess = createAction(
    '[NOTE] GET_NOTE_UPDATED_TIMESTAMP_SUCCESS',
    props<{ note: Note }>()
);

export const getNoteUpdatedTimestampFail = createAction(
    '[NOTE] GET_NOTE_UPDATED_TIMESTAMP_FAIL',
    props<{ payload: string }>()
);

export const updatePinOrder = createAction('[NOTE] UPDATE_PIN_ORDER', props<{ note: Note }>());

export const updatePinOrderSuccess = createAction('[NOTE] UPDATE_PIN_ORDER_SUCCESS', props<{ note: Note }>());

export const updatePinOrderFail = createAction('[NOTE] UPDATE_PIN_ORDER_FAIL', props<{ payload: string }>());

export const restoreNote = createAction('[NOTE] RESTORE_NOTE', props<{ note: Note }>());

export const restoreNoteSuccess = createAction('[NOTE] RESTORE_NOTE_SUCCESS', props<{ note: Note }>());

export const restoreNoteFail = createAction('[NOTE] RESTORE_NOTE_FAIL', props<{ payload: string }>());

export const archiveNote = createAction('[NOTE] ARCHIVE_NOTE', props<{ note: Note }>());

export const archiveNoteSuccess = createAction('[NOTE] ARCHIVE_NOTE_SUCCESS', props<{ note: Note }>());

export const archiveNoteFail = createAction('[NOTE] ARCHIVE_NOTE_FAIL', props<{ payload: string }>());

export const noteSelect = createAction('[NOTE] SELECT', props<{ note: Note }>());

export const updateOpendNote = createAction('[NOTE] UPDATE_OPEND_NOTE', props<{ note: Note }>());

export const updateNoteColour = createAction('[NOTE] UPDATE_NOTE_COLOUR', props<{ note: Note }>());

export const updateNoteColourSuccess = createAction(
    '[NOTE] UPDATE_NOTE_COLOUR_SUCCESS',
    props<{ note: Note }>()
);

export const updateNoteColourFail = createAction(
    '[NOTE] UPDATE_NOTE_COLOUR_FAIL',
    props<{ payload: string }>()
);

export const fetchNotesComplete = createAction('[NOTE] FETCH_NOTES_COMPLETE');

export const fetchNotesStart = createAction('[NOTE] FETCH_NOTES_START');

export const updateNoteSelection = createAction('[NOTE] UPDATE_NOTE_SELECTION', props<{ note: Note }>());

export const unselectNote = createAction('[NOTE] UNSELECT_NOTE');

export const updateNoteSelectionSuccess = createAction(
    '[NOTE] UPDATE_NOTE_SELECTION_SUCCESS',
    props<{ note: Note }>()
);

export const updateNoteSelectionFail = createAction(
    '[NOTE] UPDATE_NOTE_SELECTION_FAIL',
    props<{ payload: string }>()
);

export const toggleSpellCheck = createAction('[NOTE] TOGGLE_SPELL_CHECK', props<{ note: Note }>());

export const toggleSpellCheckSuccess = createAction(
    '[NOTE] TOGGLE_SPELL_CHECK_SUCCESS',
    props<{ note: Note }>()
);

export const toggleSpellCheckFail = createAction(
    '[NOTE] TOGGLE_SPELL_CHECK_FAIL',
    props<{ payload: string }>()
);
