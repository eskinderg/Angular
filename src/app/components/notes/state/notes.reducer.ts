import { ActionReducer, Action } from '@ngrx/store';
import { NotesActions } from '../notes.actions';
import { Note } from '../note';

export function notes(state: Note[] = [], { payload, type }: Action) {
  switch (type) {

    case NotesActions.CREATE_NOTE_SUCCESS:
      return [...state, payload.note];

    case NotesActions.FETCH_NOTES_SUCCESS:
      return payload.notes || [];

    case NotesActions.UPDATE_NOTE_SUCCESS:
      return state.map((note: Note) => {
        return note.id === payload.note.id ? payload.note : note;
      });

    case NotesActions.DELETE_NOTE:            /* TODO item removed before being removed from the server */
      return state.filter((note: Note) => {
        return note.id !== payload.id;
      });

    default:
      return state;
  }
};
