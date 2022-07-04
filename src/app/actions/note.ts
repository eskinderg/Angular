import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note';
/*
 List of notes messages
 */

// ===================================
//  CREATE NEW NOTE
// -----------------------------------

export const createNewNote = createAction(
  'CREATE_NEW_NOTE',
  props<{ payload: Note }>()
)

export const createNewNoteFail = createAction(
  'CREATE_NEW_NOTE_FAIL',
  props<{ payload: string }>()
)

export const createNewNoteSuccess = createAction(
  'CREATE_NEW_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  CREATE
// -----------------------------------

export const createNote = createAction(
  'CREATE_NOTE',
  props<{ payload: Note }>()
)

export const createNoteFail = createAction(
  'CREATE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const createNoteSuccess = createAction(
  'CREATE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  DELETE
// -----------------------------------

export const deleteNote = createAction(
  'DELETE_NOTE',
  props<{ payload: Note }>()
)

export const deleteNoteFail = createAction(
  'DELETE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const deleteNoteSuccess = createAction(
  'DELETE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

// ===================================
//  FETCH
// -----------------------------------

export const fetchNotes = createAction(
  'FETCH_NOTES'
)

export const fetchNotesFailed = createAction(
  'FETCH_NOTES_FAILURE',
  props<{ payload: string }>()
)

export const fetchNotesSuccess = createAction(
  'FETCH_NOTES_SUCCESS',
  props<{ payload: Note[] }>()
)

// ===================================
//  UPDATE
// -----------------------------------

export const updateNoteText = createAction(
  'UPDATE_NOTE_TEXT',
  props<{ payload: Note }>()
)

export const updateNoteTextSuccess = createAction(
  'UPDATE_NOTE_TEXT_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteTextFail = createAction(
  'UPDATE_NOTE_TEXT_FAIL',
  props<{ payload: string }>()
)

export const updateNoteHeader = createAction(
  'UPDATE_NOTE_HEADER',
  props<{ payload: Note }>()
)

export const updateNoteHeaderSuccess = createAction(
  'UPDATE_NOTE_HEADER_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteHeaderFail = createAction(
  'UPDATE_NOTE_HEADER_FAIL',
  props<{ payload: string }>()
)

export const updateNote = createAction(
  'UPDATE_NOTE',
  props<{ payload: Note }>()
)

export const updateNoteFail = createAction(
  'UPDATE_NOTE_FAIL',
  props<{ payload: string }>()
)

export const updateNoteSuccess = createAction(
  'UPDATE_NOTE_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNotePosition = createAction(
  'UPDATE_NOTE_POSITION',
  props<{ payload: Note }>()
)

export const updateNotePositionSuccess = createAction(
  'UPDATE_NOTE_POSITION_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNotePositionFail = createAction(
  'UPDATE_NOTE_POSITION_FAIL',
  props<{ payload: string }>()
)

export const updateNoteSize = createAction(
  'UPDATE_NOTE_SIZE',
  props<{ payload: Note }>()
)

export const updateNoteSizeSuccess = createAction(
  'UPDATE_NOTE_SIZE_SUCCESS',
  props<{ payload: Note }>()
)

export const updateNoteSizeFail = createAction(
  'UPDATE_NOTE_SIZE_FAIL',
  props<{ payload: string }>()
)

//--- GET

export const getNote = createAction(
  'GET_NOTE',
  props<{ payload: Note }>()
)

export const getNoteFail = createAction(
  'GET_NOTE_FAIL',
  props<{ payload: string }>()
)

export const getNoteSuccess = createAction(
  'GET_NOTE_SUCCESS',
  props<{ payload: Note }>()
)
