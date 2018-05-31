import { Action, createFeatureSelector, createSelector} from '@ngrx/store';
import * as NotesActions from '../actions/note';
import { Note } from '../models/note';

export interface State {
  notes: Note[];
}

export const initialState: State = {
  notes: []
};

export function reducer(state = initialState , action: NotesActions.Actions): State {

  switch (action.type) {

    case NotesActions.CREATE_NEW_NOTE:
      return {
        notes: [...state.notes, action.payload]
      };

    case NotesActions.CREATE_NOTE_SUCCESS:
      return {
        notes: [...state.notes, action.payload]
      };

    case NotesActions.FETCH_NOTES_SUCCESS:
      return {
        notes: action.payload || []
      };

    case NotesActions.UPDATE_NOTE_POSITION_SUCCESS:
    case NotesActions.UPDATE_NOTE_SIZE_SUCCESS:
    case NotesActions.UPDATE_NOTE_TEXT_SUCCESS:
    case NotesActions.UPDATE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        notes: state.notes.map(note =>
          (( note.id===action.payload.id )|| note.id==undefined) ? action.payload : note)
      });

    case NotesActions.DELETE_NOTE_SUCCESS:
      return Object.assign({}, state, {
        notes: state.notes.filter((note: Note) => {
          return note.id !== action.payload.id;
        })
      });

    default:
      return state;
  }
};

function noteSaved(payload:  Note, state: Note) {
  if( payload ==undefined )
    return state
  else if(state.id == payload.id)
    return payload;
  else if (state.id==undefined)
    return payload;
}

export const getNoteSTate = createFeatureSelector<State>('notes');

export const getNotes = createSelector(getNoteSTate,(state: State) => state.notes);

