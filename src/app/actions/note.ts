import { Action } from '@ngrx/store';
import { Note } from '../models/note';
/*
 List of notes messages
 */
export const CREATE_NEW_NOTE              = 'CREATE_NEW_NOTE';
export const CREATE_NEW_NOTE_SUCCESS      = 'CREATE_NEW_NOTE_SUCCESS';
export const CREATE_NEW_NOTE_FAIL         = 'CREATE_NEW_NOTE_FAIL';

export const CREATE_NOTE                  = 'CREATE_NOTE';
export const CREATE_NOTE_SUCCESS          = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAIL             = 'CREATE_NOTE_FAIL';

export const UPDATE_NOTE                  = 'UPDATE_NOTE';
export const UPDATE_NOTE_SUCCESS          = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAIL             = 'UPDATE_NOTE_FAIL';

export const UPDATE_NOTE_TEXT             = 'UPDATE_NOTE_TEXT';
export const UPDATE_NOTE_TEXT_SUCCESS     = 'UPDATE_NOTE_TEXT_SUCCESS';
export const UPDATE_NOTE_TEXT_FAIL        = 'UPDATE_NOTE_TEXT_FAIL';

export const UPDATE_NOTE_HEADER           = 'UPDATE_NOTE_HEADER';
export const UPDATE_NOTE_HEADER_SUCCESS   = 'UPDATE_NOTE_HEADER_SUCCESS';
export const UPDATE_NOTE_HEADER_FAIL      = 'UPDATE_NOTE_HEADER_FAIL';

export const UPDATE_NOTE_POSITION         = 'UPDATE_NOTE_POSITION';
export const UPDATE_NOTE_POSITION_SUCCESS = 'UPDATE_NOTE_POSITION_SUCCESS';
export const UPDATE_NOTE_POSITION_FAIL    = 'UPDATE_NOTE_POSITION_FAIL';

export const UPDATE_NOTE_SIZE             = 'UPDATE_NOTE_SIZE';
export const UPDATE_NOTE_SIZE_SUCCESS     = 'UPDATE_NOTE_SIZE_SUCCESS';
export const UPDATE_NOTE_SIZE_FAIL        = 'UPDATE_NOTE_SIZE_FAIL';

export const DELETE_NOTE                  = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS          = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAIL             = 'DELETE_NOTE_FAIL';

export const SAVE_NOTE                    = 'SAVE_NOTE';
export const SAVE_NOTE_SUCCESS            = 'SAVE_NOTE_SUCCESS';
export const SAVE_NOTE_FAILURE            = 'SAVE_NOTE_FAILURE';
export const ADD_NOTE_FROMSERVER          = 'ADD_NOTE_FROMSERVER';

export const FETCH_NOTES                  = 'FETCH_NOTES';
export const FETCH_NOTES_SUCCESS          = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE          = 'FETCH_NOTES_FAILURE';

export const TOGGLE_NOTE                  = 'TOGGLE_NOTE';
export const TOGGLE_NOTE_SUCCESS          = 'TOGGLE_NOTE_SUCCESS';
export const TOGGLE_NOTE_FAILURE          = 'TOGGLE_NOTE_FAILURE';

export const GET_NOTE                     = 'GET_NOTE';
export const GET_NOTE_SUCCESS             = 'GET_NOTE_SUCCESS';
export const GET_NOTE_FAIL                = 'GET_NOTE_FAIL';

// ===================================
//  CREATE NEW NOTE
// -----------------------------------

export class CreateNewNote implements Action {

  readonly type = CREATE_NEW_NOTE;

  constructor (public payload: Note) { }
}


export class CreateNewNoteFail implements Action {

  readonly type = CREATE_NEW_NOTE_FAIL;

  constructor (public payload: string) { }
}


export class CreateNewNoteSuccess implements Action {

  readonly type = CREATE_NEW_NOTE_SUCCESS;

  constructor (public payload: Note) { }
}

// ===================================
//  CREATE
// -----------------------------------

export class CreateNote implements Action {

  readonly type = CREATE_NOTE;

  constructor (public payload: Note ) { }
}


export class CreateNoteFail implements Action {

  readonly type = CREATE_NOTE_FAIL;

  constructor (public payload: string) { }
}


export class CreateNoteSuccess implements Action {

  readonly type = CREATE_NOTE_SUCCESS;

  constructor (public payload: Note) { }
}

// ===================================
//  DELETE
// -----------------------------------


export class DeleteNote implements Action {

  readonly type = DELETE_NOTE;

  constructor (public payload: Note) { }
}


export class DeleteNoteFail implements Action {

  readonly type = DELETE_NOTE_FAIL;

  constructor (public payload: string) { }
}


export class DeleteNoteSuccess implements Action {

  readonly type = DELETE_NOTE_SUCCESS;

  constructor (public payload: Note) { }
}

// ===================================
//  FETCH
// -----------------------------------


export class FetchNotes implements Action {

  readonly type = FETCH_NOTES;

  constructor () { }
}


export class FetchNotesFailed implements Action {

  readonly type = FETCH_NOTES_FAILURE;

  constructor (public payload: string) { }
}


export class FetchNotesSuccess implements Action {

  readonly type = FETCH_NOTES_SUCCESS;

  constructor (public payload: Note[]) { }
}

// ===================================
//  UPDATE
// -----------------------------------

export class UpdateNoteText implements Action {

  readonly type = UPDATE_NOTE_TEXT;

  constructor (public payload: Note) { }
}


export class UpdateNoteTextSuccess implements Action {

  readonly type = UPDATE_NOTE_TEXT_SUCCESS;

  constructor (public payload: Note) { }
}


export class UpdateNoteTextFail implements Action {

  readonly type = UPDATE_NOTE_TEXT_FAIL;

  constructor (public payload: string) { }
}


export class UpdateNoteHeader implements Action {

  readonly type = UPDATE_NOTE_HEADER;

  constructor (public payload: Note) { }
}


export class UpdateNoteHeadertSuccess implements Action {

  readonly type = UPDATE_NOTE_HEADER_SUCCESS;

  constructor (public payload: Note) { }
}


export class UpdateNoteHeaderFail implements Action {

  readonly type = UPDATE_NOTE_HEADER_FAIL;

  constructor (public payload: string) { }
}

export class UpdateNote implements Action {

  readonly type = UPDATE_NOTE;

  constructor (public payload: Note) { }
}


export class UpdateNoteFail implements Action {

  readonly type = UPDATE_NOTE_FAIL;

  constructor (public payload: string) { }
}


export class UpdateNoteSuccess implements Action {

  readonly type = UPDATE_NOTE_SUCCESS;

  constructor (public payload: Note) { }
}


export class UpdateNotePosition implements Action {

  readonly type = UPDATE_NOTE_POSITION;

  constructor (public payload: Note) { }
}


export class UpdateNotePositionSuccess implements Action {

  readonly type = UPDATE_NOTE_POSITION_SUCCESS;

  constructor (public payload: Note) { }
}


export class UpdateNotePositionFail implements Action {

  readonly type = UPDATE_NOTE_POSITION_FAIL;

  constructor (public payload: string) { }
}

export class UpdateNoteSize implements Action {

  readonly type = UPDATE_NOTE_SIZE;

  constructor (public payload: Note) { }
}


export class UpdateNoteSizeSuccess implements Action {

  readonly type = UPDATE_NOTE_SIZE_SUCCESS;

  constructor (public payload: Note) { }
}


export class UpdateNoteSizeFail implements Action {

  readonly type = UPDATE_NOTE_SIZE_FAIL;

  constructor (public payload: string) { }
}

//--- GET

export class GetNote implements Action {

  readonly type = GET_NOTE;

  constructor (public payload: Note) { }
}

export class GetNoteFail implements Action {

  readonly type = GET_NOTE_FAIL;

  constructor (public payload: string) { }
}

export class GetNoteSuccess implements Action {

  readonly type = GET_NOTE_SUCCESS;

  constructor (public payload: Note) { }
}

//

export type Actions =
  FetchNotes | FetchNotesSuccess | FetchNotesFailed |
  CreateNewNote | CreateNewNoteSuccess | CreateNewNoteFail |
  CreateNote | CreateNoteSuccess | CreateNoteFail |
  DeleteNote | DeleteNoteSuccess | DeleteNoteFail |
  UpdateNote | UpdateNoteSuccess | UpdateNoteFail |
  UpdateNoteText | UpdateNoteTextSuccess | UpdateNoteTextFail |
  UpdateNotePositionFail | UpdateNotePositionSuccess | UpdateNotePositionFail |
  UpdateNoteSizeFail | UpdateNoteSizeSuccess | UpdateNoteSizeFail |
  GetNote | GetNoteSuccess | GetNoteFail |
  UpdateNotePosition | UpdateNoteSuccess | UpdateNotePositionFail |
  UpdateNoteHeader | UpdateNoteHeadertSuccess | UpdateNoteHeaderFail;
