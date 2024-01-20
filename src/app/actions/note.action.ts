import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note';

/*
 List of notes messages
 */

// ===================================
//  CREATE NEW NOTE
// -----------------------------------

export const createNewNote = createAction(
  '[NOTE] CREATE_NEW_NOTE',
  props<{ payload: Note }>()
)

export const createNewNoteFail = createAction(
  '[NOTE] CREATE_NEW_NOTE_FAIL',
  props<{ payload: string }>()
)

export const createNewNoteSuccess = createAction(
  '[NOTE] CREATE_NEW_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  CREATE
// -----------------------------------

export const createNote = createAction(
  '[NOTE] CREATE_NOTE',
  props<{ payload: Note }>()
)

export const createNoteFail = createAction(
  '[NOTE] CREATE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const createNoteSuccess = createAction(
  '[NOTE] CREATE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  DELETE
// -----------------------------------

export const deleteNote = createAction(
  '[NOTE] DELETE_NOTE',
  props<{ payload: Note }>()
)

export const deleteNoteFail = createAction(
  '[NOTE] DELETE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const deleteNoteSuccess = createAction(
  '[NOTE] DELETE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  FETCH
// -----------------------------------

export const fetchNotes = createAction(
  '[NOTE] FETCH_NOTES'
)

export const fetchNotesFailed = createAction(
  '[NOTE] FETCH_NOTES_FAILURE',
  props<{ payload: string }>()
)

export const fetchNotesSuccess = createAction(
  '[NOTE] FETCH_NOTES_SUCCESS',
  props<{ payload: Note[] }>()
)

// ===================================
//  UPDATE
// -----------------------------------

export const updateNoteText = createAction(
  '[NOTE] UPDATE_NOTE_TEXT',
  props<{ payload: Note }>()
)

export const updateNoteTextSuccess = createAction(
  '[NOTE] UPDATE_NOTE_TEXT_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteTextFail = createAction(
  '[NOTE] UPDATE_NOTE_TEXT_FAIL',
  props<{ payload: string }>()
)

export const updateNoteHeader = createAction(
  '[NOTE] UPDATE_NOTE_HEADER',
  props<{ payload: Note }>()
)

export const updateNoteHeaderSuccess = createAction(
  '[NOTE] UPDATE_NOTE_HEADER_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteHeaderFail = createAction(
  '[NOTE] UPDATE_NOTE_HEADER_FAIL',
  props<{ payload: string }>()
)

export const updateNote = createAction(
  '[NOTE] UPDATE_NOTE',
  props<{ payload: Note }>()
)

export const updateNoteFail = createAction(
  '[NOTE] UPDATE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const updateNoteSuccess = createAction(
  '[NOTE] UPDATE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNotePosition = createAction(
  '[NOTE] UPDATE_NOTE_POSITION',
  props<{ payload: Note }>()
)

export const updateNotePositionSuccess = createAction(
  '[NOTE] UPDATE_NOTE_POSITION_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNotePositionFail = createAction(
  '[NOTE] UPDATE_NOTE_POSITION_FAIL',
  props<{ payload: string }>()
)

export const updateNoteSize = createAction(
  '[NOTE] UPDATE_NOTE_SIZE',
  props<{ payload: Note }>()
)

export const updateNoteSizeSuccess = createAction(
  '[NOTE] UPDATE_NOTE_SIZE_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteSizeFail = createAction(
  '[NOTE] UPDATE_NOTE_SIZE_FAIL',
  props<{ payload: string }>()
)

//--- GET

export const getNote = createAction(
  '[NOTE] GET_NOTE',
  props<{ payload: Note }>()
)

export const getNoteFail = createAction(
  '[NOTE] GET_NOTE_FAIL',
  props<{ payload: string }>()
)

export const getNoteSuccess = createAction(
  '[NOTE] GET_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

export const getNoteUpdatedTimeStamp = createAction(
  '[NOTE] GET_NOTE_UPDATED_TIMESTAMP',
  props<{ payload: Note }>()
)

export const getNoteUpdatedTimestampSuccess = createAction(
  '[NOTE] GET_NOTE_UPDATED_TIMESTAMP_SUCCESS',
  props<{ payload: Note }>()
)

export const getNoteUpdatedTimestampFail = createAction(
  '[NOTE] GET_NOTE_UPDATED_TIMESTAMP_FAIL',
  props<{ payload: string }>()
)

export const updatePinOrder = createAction(
  '[NOTE] UPDATE_PIN_ORDER',
  props<{ payload: Note }>()
)

export const updatePinOrderSuccess = createAction(
  '[NOTE] UPDATE_PIN_ORDER_SUCCESS',
  props<{ payload: Note }>()
)

export const updatePinOrderFail = createAction(
  '[NOTE] UPDATE_PIN_ORDER_FAIL',
  props<{ payload: string }>()
)

export const restoreNote = createAction(
  '[NOTE] RESTORE_NOTE',
  props<{ payload: Note }>()
)

export const restoreNoteSuccess = createAction(
  '[NOTE] RESTORE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

export const restoreNoteFail = createAction(
  '[NOTE] RESTORE_NOTE_FAIL',
  props<{ payload: string }>()
)
