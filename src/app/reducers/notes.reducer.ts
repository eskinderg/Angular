import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.action';
import { Note } from '../models/note';
import { AppRouterState, getAppRouterState } from './route.reducer';

export interface NotesState {
  notes: Note[];
  selectedNote: Note;
  opendNote: Note;
  animate: {
    text: boolean,
    date: boolean
  };
}

export const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  opendNote: null,
  animate: {
    text: false,
    date: false
  }
};

export const notesReducer = createReducer<NotesState>(initialState,
  on(
    NotesActions.noteSelect,
    (state, action): NotesState => {
      return { ...state, selectedNote: action.payload, opendNote: action.payload }
    }
  ),
  on(
    NotesActions.updateOpendNote,
    (state, action): NotesState => {
      return { ...state, opendNote: action.payload }
    }),
  on(
    NotesActions.createNoteSuccess,
    (state, action): NotesState => {

      return {
        notes: pinnedNotes([action.payload, ...state.notes]),
        selectedNote: action.payload,
        opendNote: action.payload,
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
      selectedNote: null,
      opendNote: null,
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
      selectedNote: action.payload,
      opendNote: null,
      animate: {
        text: false,
        date: false
      }
    })),
  on(
    NotesActions.restoreNoteSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      const newState: Note[] = dateModifiedNotes(notes);

      return { ...state, notes: pinnedNotes(newState), animate: { ...state.animate, text: false, date: false } };
    }
  ),
  on(
    NotesActions.updateNoteTextSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      // let index = notes.findIndex(note => note.id === action.payload.id);

      // if (!index) {
      //   return { notes: notes, animate: { text: false, date: false } };
      // }

      const newState: Note[] = [ // move the newly updated note to the top of the list
        notes.find(note => note.id === action.payload.id),
        ...notes.filter(n => n.id !== action.payload.id),
      ];

      // return {...state};
      // return {...state, notes: state.notes.map(n=>n.id===action.payload.id ? {...n, text: action.payload.text} : n), animate: {...state.animate,text:false,date: false,} };
      // return {...state, notes: state.notes.map(n=>n.id===action.payload.id ? {...n,text:action.payload.text} : n), animate: {...state.animate,text:false,date: false,} };
      return { ...state, notes: pinnedNotes(newState), animate: { ...state.animate, text: false, date: false } };
      // return { notes: pinnedNotes(newState), selected: state.selected, animate: { text: false, date: false } };
    }
  ),
  on(
    NotesActions.updatePinOrder,
    (state, action): NotesState => {

      if (action.payload.id === state.opendNote?.id) // update current opend note
        return { ...state, opendNote: { ...state.opendNote, pinOrder: action.payload.pinOrder } }

      return state;
    }
  ),
  on(
    NotesActions.updatePinOrderSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      const newState: Note[] = [ // move the newly updated note to the top of the list
        notes.find(note => note.id === action.payload.id),
        ...notes.filter(n => n.id !== action.payload.id),
      ];

      // return { notes: pinnedNotes(dateModifiedNotes(newState)), selected: action.payload, opendNote: state.opendNote, animate: { text: true, date: false } };
      return { ...state, notes: pinnedNotes(dateModifiedNotes(newState)), animate: { text: true, date: false } };
    }
  ),
  on(
    NotesActions.getNoteUpdatedTimestampSuccess,
    (state, action): NotesState => ({
      notes: state.notes.map(note =>
        note.id === action.payload.id ? { ...note, dateModified: action.payload.dateModified } : note),
      selectedNote: action.payload,
      opendNote: state.opendNote,
      animate: {
        text: state.animate.text,
        date: state.animate.date
      }
    })),
  on(
    NotesActions.deleteNoteSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;
      })

      return {
        notes: notes, selectedNote: null, opendNote: null, animate: { text: true, date: true }
      }

    })
)

export function dateModifiedNotes(notes: Note[]): Note[] {
  return [
    ...notes
  ].sort((a, b) => (a.dateModified > b.dateModified ? -1 : 1))
}

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

export const getNotes = createSelector(getNoteSTate, (state: NotesState) => {
  return state.notes.filter(n => !n.archived);
});

export const getArchivedNotes = createSelector(getNoteSTate, (state: NotesState) => {
  return state.notes.filter(n => n.archived).sort((a, b) => (a.dateArchived > b.dateArchived ? -1 : 1));
});

export const getNotesLength = createSelector(getNoteSTate, (state: NotesState) => state.notes.filter(n => !n.archived).length);

export const getNotesAnimate = createSelector(getNoteSTate, (state: NotesState) => state.animate);

export const getSelectedNote = createSelector(getNoteSTate, (state: NotesState) => state.selectedNote ? state.notes.find(n => n.id === state.selectedNote.id) : new Note());

export const getOpendNote = createSelector(getNoteSTate, (state: NotesState) => state.opendNote as Note);

export const getNoteById = (id: number) => createSelector(getNoteSTate, (allItems) => {
  if (allItems.notes) {
    return allItems.notes.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});

export const getNoteCurrentRoute = createSelector(getNoteSTate, getAppRouterState, (state: NotesState, routerState: AppRouterState) => {
  if (state.notes) {
    return state.notes.find(item => {
      return item.id === Number(routerState.params['id'])
    });
  } else {
    return {};
  }
});
