import { Action } from '@ngrx/store';
import { Note } from './note';
/*
List of notes messages
 */
export class NotesActions {

  static CREATE_NOTE = 'CREATE_NOTE';
  static CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
  static CREATE_NOTE_FAIL = 'CREATE_NOTE_FAIL';

  static UPDATE_NOTE = 'UPDATE_NOTE';
  static UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
  static UPDATE_NOTE_FAIL = 'UPDATE_NOTE_FAIL';

  static DELETE_NOTE = 'DELETE_NOTE';
  static DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
  static DELETE_NOTE_FAIL = 'DELETE_NOTE_FAIL';

  static SAVE_NOTE = 'SAVE_NOTE';
  static SAVE_NOTE_SUCCESS = 'SAVE_NOTE_SUCCESS';
  static SAVE_NOTE_FAILURE = 'SAVE_NOTE_FAILURE';
  static ADD_NOTE_FROMSERVER = 'ADD_NOTE_FROMSERVER';

  static FETCH_NOTES = 'FETCH_NOTES';
  static FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
  static FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

  static TOGGLE_NOTE = 'TOGGLE_NOTE';
  static TOGGLE_NOTE_SUCCESS = 'TOGGLE_NOTE_SUCCESS';
  static TOGGLE_NOTE_FAILURE = 'TOGGLE_NOTE_FAILURE';


  // ===================================
  //  CREATE
  // -----------------------------------
  createNote(note: Note): Action {
    return {
      type: NotesActions.CREATE_NOTE,
      payload: {
        note
      }
    };
  }

  createNoteFail(error: any): Action {
    return {
      type: NotesActions.CREATE_NOTE_FAIL,
      payload: error
    };
  }

  createNoteSuccess(note: Note): Action {
    return {
      type: NotesActions.CREATE_NOTE_SUCCESS,
      payload: {
        note
      }
    };
  }


  // ===================================
  //  DELETE
  // -----------------------------------
  deleteNote(id: number): Action {
    return {
      type: NotesActions.DELETE_NOTE,
      payload: {
        id
      }
    };
  }

  deleteNoteFail(error: any): Action {
    return {
      type: NotesActions.DELETE_NOTE_FAIL,
      payload: error
    };
  }

  deleteNoteSuccess(note: Note): Action {
    return {
      type: NotesActions.DELETE_NOTE_SUCCESS,
      payload: {
        note
      }
    };
  }


  // ===================================
  //  FETCH
  // -----------------------------------

  fetchNotes(): Action {
    return {
      type: NotesActions.FETCH_NOTES
    };
  }

  fetchNotesFailed(error: any): Action {
    return {
      type: NotesActions.FETCH_NOTES_FAILURE,
      payload: error
    };
  }

  fetchNotesSuccess(notes: Note[]): Action {
    return {
      type: NotesActions.FETCH_NOTES_SUCCESS,
      payload: {
        notes
      }
    };
  }


  // ===================================
  //  UPDATE
  // -----------------------------------

  updateNote(id: number, changes: Note): Action {
    return {
      type: NotesActions.UPDATE_NOTE,
      payload: {
        changes,
        id
      }
    };
  }

  updateNoteFail(error: any): Action {
    return {
      type: NotesActions.UPDATE_NOTE_FAIL,
      payload: error
    };
  }

  updateNoteSuccess(note: Note): Action {
    return {
      type: NotesActions.UPDATE_NOTE_SUCCESS,
      payload: {
        note
      }
    };
  }


}
