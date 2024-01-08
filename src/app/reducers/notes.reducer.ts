import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.action';
import { Note } from '../models/note';

export interface NotesState {
  notes: Note[];
  animate: {
    text: boolean,
    date: boolean
  };
}

export const initialState: NotesState = {
  notes: [],
  animate: {
    text: false,
    date: false
  }
};

export const notesReducer = createReducer(initialState,
  on(
    NotesActions.createNoteSuccess,
    (state, action): NotesState => {

      return {
        notes: pinnedNotes([action.payload, ...state.notes]),
        animate: {
          text: true,
          date: true
        }
      }
    }),
  on(
    NotesActions.fetchNotesSuccess,
    (_state, action): NotesState => ({
      notes: action.payload,
      animate: {
        text: true,
        date: true
      }
    })),
  on(
    NotesActions.updateNoteSuccess,
    NotesActions.updateNotePositionSuccess,
    NotesActions.updateNoteSizeSuccess,
    (state, action): NotesState => ({
      notes: state.notes.map(note =>
        ((note.id === action.payload.id) || note.id === undefined) ? action.payload : note),
      animate: {
        text: false,
        date: false
      }
    })),
  on(
    NotesActions.updateNoteTextSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? { ...note, text: action.payload.text } : note;  // First update the note text
      })

      // let index = notes.findIndex(note => note.id === action.payload.id);

      // if (!index) {
      //   return { notes: notes, animate: { text: false, date: false } };
      // }

      const newState: Note[] = [ // move the newly updated note to the top of the list
        notes.find(note => note.id === action.payload.id),
        ...notes.filter(n => n.id !== action.payload.id),
      ];

      return { notes: pinnedNotes(newState), animate: { text: false, date: false } };
    }
  ),
  on(
    NotesActions.updatePinOrderSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? { ...note, pinOrder: action.payload.pinOrder } : note;  // First update the note text
      })

      const newState: Note[] = [ // move the newly updated note to the top of the list
        notes.find(note => note.id === action.payload.id),
        ...notes.filter(n => n.id !== action.payload.id),
      ];

      return { notes: pinnedNotes(newState), animate: { text: true, date: false } };
    }
  ),
  on(
    NotesActions.getNoteUpdatedTimestampSuccess,
    (state, action): NotesState => ({
      notes: state.notes.map(note =>
        note.id === action.payload.id ? { ...note, dateModified: action.payload.dateModified } : note),
      animate: {
        text: state.animate.text,
        date: state.animate.date
      }
    })),
  on(
    NotesActions.deleteNoteSuccess,
    (state, action): NotesState => ({
      notes: state.notes.filter((note: Note) => {
        return note.id !== action.payload.id;
      }), animate: { text: true, date: true }
    }))
)

export function pinnedNotes(notes: Note[]): Note[] {
  return [
    ...notes.filter(note => note.pinOrder !== null),
    ...notes.filter(n => n.pinOrder === null),
  ].sort((a, b) => (a.pinOrder > b.pinOrder ? -1 : 1))
}

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

export const getNotesLength = createSelector(getNoteSTate, (state: NotesState) => state.notes.length);

export const getNotesAnimate = createSelector(getNoteSTate, (state: NotesState) => state.animate);

export const getNoteById = (id: number) => createSelector(getNoteSTate, (allItems) => {
  if (allItems.notes) {
    return allItems.notes.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});
