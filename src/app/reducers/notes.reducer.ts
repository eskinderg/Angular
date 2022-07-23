import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.action';
import { Note } from '../models/note';

export interface NotesState {
  notes: Note[];
}

export const initialState: NotesState = {
  notes: []
};

export const notesReducer = createReducer(
  initialState,
  on(
    NotesActions.createNewNote,
    (state, action): NotesState => ({
      notes: [action.payload, ...state.notes]
    })),
  on(
    NotesActions.createNoteSuccess,
    (state, action): NotesState => ({
      notes: [action.payload, ...state.notes]
    })),
  on(
    NotesActions.fetchNotesSuccess,
    (state, action): NotesState => ({
      notes: action.payload || []
    })),
  on(
    NotesActions.updateNoteSuccess,
    NotesActions.updateNotePositionSuccess,
    NotesActions.updateNoteSizeSuccess,
    (state, action): NotesState => ({
      notes: state.notes.map(note =>
        ((note.id === action.payload.id) || note.id === undefined) ? action.payload : note)
    })),
  on(
    NotesActions.deleteNoteSuccess,
    (state, action): NotesState => ({
      notes: state.notes.filter((note: Note) => {
        return note.id !== action.payload.id;
      })
    })),
)

// export function reducer(state = initialState, action: NotesActions.Actions): State {

//   switch (action.type) {

//     case NotesActions.CREATE_NEW_NOTE:
//       return {
//         notes: [action.payload, ...state.notes]
//       };

//     case NotesActions.CREATE_NOTE_SUCCESS:
//       return {
//         notes: [action.payload, ...state.notes]
//       };

//     case NotesActions.FETCH_NOTES_SUCCESS:
//       return {
//         notes: action.payload || []
//       };

//     case NotesActions.UPDATE_NOTE_POSITION_SUCCESS:
//     case NotesActions.UPDATE_NOTE_SIZE_SUCCESS:
//     // case NotesActions.UPDATE_NOTE_TEXT_SUCCESS:
//     case NotesActions.UPDATE_NOTE_SUCCESS:
//       return Object.assign({}, state, {
//         notes: state.notes.map(note =>
//           ((note.id === action.payload.id) || note.id === undefined) ? action.payload : note)
//       });

//     case NotesActions.DELETE_NOTE_SUCCESS:
//       return Object.assign({}, state, {
//         notes: state.notes.filter((note: Note) => {
//           return note.id !== action.payload.id;
//         })
//       });

//     default:
//       return state;
//   }
// };

export const getNoteSTate = createFeatureSelector<NotesState>('notes');

export const getNotes = createSelector(getNoteSTate, (state: NotesState) => state.notes);

export const getItemById = (id: number) => createSelector(getNoteSTate, (allItems) => {
  if (allItems.notes) {
    return allItems.notes.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});
