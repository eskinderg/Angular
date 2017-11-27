import { Action } from '@ngrx/store';
import { Note } from '../models/note';
/*
List of notes messages
 */
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAIL = 'CREATE_NOTE_FAIL';

export const UPDATE_NOTE = 'UPDATE_NOTE';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAIL = 'UPDATE_NOTE_FAIL';

export const UPDATE_NOTE_TEXT = 'UPDATE_NOTE_TEXT';
export const UPDATE_NOTE_TEXT_SUCCESS = 'UPDATE_NOTE_TEXT_SUCCESS';
export const UPDATE_NOTE_TEXT_FAIL = 'UPDATE_NOTE_TEXT_FAIL';

export const UPDATE_NOTE_POSITION = 'UPDATE_NOTE_POSITION';
export const UPDATE_NOTE_POSITION_SUCCESS = 'UPDATE_NOTE_POSITION_SUCCESS';
export const UPDATE_NOTE_POSITION_FAIL = 'UPDATE_NOTE_POSITION_FAIL';

export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';

export const SAVE_NOTE = 'SAVE_NOTE';
export const SAVE_NOTE_SUCCESS = 'SAVE_NOTE_SUCCESS';
export const SAVE_NOTE_FAILURE = 'SAVE_NOTE_FAILURE';
export const ADD_NOTE_FROMSERVER = 'ADD_NOTE_FROMSERVER';

export const FETCH_NOTES = 'FETCH_NOTES';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const TOGGLE_NOTE = 'TOGGLE_NOTE';
export const TOGGLE_NOTE_SUCCESS = 'TOGGLE_NOTE_SUCCESS';
export const TOGGLE_NOTE_FAILURE = 'TOGGLE_NOTE_FAILURE';


  // ===================================
  //  CREATE
  // -----------------------------------

  export class createNote implements Action {

    readonly type = CREATE_NOTE;

    constructor (public payload: Note ){  }
  }


  export class createNoteFail implements Action {

    readonly type = CREATE_NOTE_FAIL;

    constructor (public payload: string){  }
  }


  export class createNoteSuccess implements Action {

    readonly type = CREATE_NOTE_SUCCESS;

    constructor (public payload: Note){  }
  }

  // ===================================
  //  DELETE
  // -----------------------------------


  export class deleteNote implements Action {

    readonly type = DELETE_NOTE;

    constructor (public payload: Note){  }
  }


  export class deleteNoteFail implements Action {

    readonly type = DELETE_NOTE_FAIL;

    constructor (public payload: string){  }
  }


  export class deleteNoteSuccess implements Action {

    readonly type = DELETE_NOTE_SUCCESS;

    constructor (public payload: Note){  }
  }

  // ===================================
  //  FETCH
  // -----------------------------------


  export class fetchNotes implements Action {

    readonly type = FETCH_NOTES;

    constructor (){  }
  }


  export class fetchNotesFailed implements Action {

    readonly type = FETCH_NOTES_FAILURE;

    constructor (public payload: string){  }
  }


  export class fetchNotesSuccess implements Action {

    readonly type = FETCH_NOTES_SUCCESS;

    constructor (public payload: Note[]){  }
  }

  // ===================================
  //  UPDATE
  // -----------------------------------

  export class updateNoteText implements Action {

    readonly type = UPDATE_NOTE_TEXT;

    constructor (public payload: Note){  }
  }


  export class updateNoteTextSuccess implements Action {

    readonly type = UPDATE_NOTE_TEXT_SUCCESS;

    constructor (public payload: Note){  }
  }


  export class updateNoteTextFail implements Action {

    readonly type = UPDATE_NOTE_TEXT_FAIL;

    constructor (public payload: string){  }
  }


  export class updateNote implements Action {

    readonly type = UPDATE_NOTE;

    constructor (public payload: Note){  }
  }


  export class updateNoteFail implements Action {

    readonly type = UPDATE_NOTE_FAIL;

    constructor (public payload: string){  }
  }


  export class updateNoteSuccess implements Action {

    readonly type = UPDATE_NOTE_SUCCESS;

    constructor (public payload: Note){  }
  }


  export class updateNotePosition implements Action {

    readonly type = UPDATE_NOTE_POSITION;

    constructor (public payload: Note){  }
  }


  export class updateNotePositionSuccess implements Action {

    readonly type = UPDATE_NOTE_POSITION_SUCCESS;

    constructor (public payload: Note){  }
  }


  export class updateNotePositionFail implements Action {

    readonly type = UPDATE_NOTE_POSITION_FAIL;

    constructor (public payload: string){  }
  }

export type Actions = fetchNotes | fetchNotesSuccess | fetchNotesFailed |
                      createNote | createNoteSuccess | createNoteFail |
                      deleteNote | deleteNoteSuccess | deleteNoteFail |
                      updateNote | updateNoteSuccess | updateNoteFail |
                      updateNoteText | updateNoteTextSuccess | updateNoteTextFail |
                      updateNotePositionFail | updateNotePositionSuccess | updateNotePositionFail |
                      updateNotePosition | updateNoteSuccess | updateNotePositionFail;
