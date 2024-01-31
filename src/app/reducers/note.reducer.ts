import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.actions';
import { Note } from '../models/note';
import { AppRouterState, getAppRouterState } from './route.reducer';

export interface NotesState {
  notes: Note[];
  selectedNote: Note;
  opendNote: Note;
  isLoading: boolean;
  animate: {
    note: boolean,
    date: boolean
  };
}

export const initialState: NotesState = {
  notes: [],
  selectedNote: null,
  opendNote: null,
  isLoading: false,
  animate: {
    note: false,
    date: false
  }
};

export const notesReducer = createReducer<NotesState>(initialState,
  on(
    NotesActions.noteSelect,
    (state, action): NotesState => {

      if (state.selectedNote?.id === action.payload?.id)
        return { ...state, selectedNote: null, opendNote: null } // Toggle selection

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

      return { ...state,
        notes: pinnedNotes([action.payload, ...state.notes]),
        selectedNote: action.payload,
        opendNote: action.payload,
        animate: {
          note: true,
          date: true
        }
      }
    }),
  on(
    NotesActions.fetchNotesStart,
    (state, _action): NotesState => ({ ...state, isLoading: true
    })),
  on(
    NotesActions.fetchNotesComplete,
    (state, _action): NotesState => ({ ...state, isLoading: false
    })),
  on(
    NotesActions.fetchNotesSuccess,
    (state, action): NotesState => ({ ...state,
      notes: action.payload,
      selectedNote: null,
      opendNote: null,
      animate: {
        note: true,
        date: true
      }
    })),
  on(
    NotesActions.updateNoteSuccess,
    NotesActions.updateNotePositionSuccess,
    NotesActions.updateNoteSizeSuccess,
    NotesActions.updateNoteHeaderSuccess,
    (state, action): NotesState => ({
      ...state,
      notes: state.notes.map(note =>
        ((note.id === action.payload.id) || note.id === undefined) ? action.payload : note),
      animate: {
        note: true,
        date: true,
      }
    })),
  on(
    NotesActions.restoreNoteSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      const newState: Note[] = dateModifiedNotes(notes);

      return { ...state, notes: pinnedNotes(newState), animate: { ...state.animate, note: false, date: false } };
    }
  ),
  on(
    NotesActions.updateNoteColourSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      return { ...state, notes: notes, animate: { ...state.animate, note: false, date: false } };
    }
  ),
  on(
    NotesActions.updateNoteTextSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;  // First update the note text
      })

      const newState: Note[] = [ // move the newly updated note to the top of the list
        notes.find(note => note.id === action.payload.id),
        ...notes.filter(n => n.id !== action.payload.id),
      ];

      return { ...state, notes: pinnedNotes(newState), animate: { ...state.animate, note: false, date: false } };
    }
  ),
  on(
    NotesActions.updatePinOrder,
    (state, action): NotesState => {
      return (action.payload.id === state.opendNote?.id) ?                                    // update current opend note
        { ...state, opendNote: { ...state.opendNote, pinOrder: action.payload.pinOrder } } :
        state
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

      return { ...state, notes: pinnedNotes(dateModifiedNotes(newState)), animate: { note: true, date: false } };
    }
  ),
  on(
    NotesActions.getNoteUpdatedTimestampSuccess,
    (state, action): NotesState => ({
      ...state, notes: state.notes.map(note => {
        return note.id === action.payload.id ? { ...note, dateModified: action.payload.dateModified } : note
      }),
    })),
  on(
    NotesActions.archiveNoteSuccess,
    NotesActions.deleteNoteSuccess,
    (state, action): NotesState => {

      let notes: Note[] = state.notes.map(note => {
        return note.id === action.payload.id ? action.payload : note;
      })

      return {
        ...state, notes: notes, selectedNote: null, opendNote: null, animate: { note: true, date: true }
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

export const getIsLoading = createSelector(getNoteSTate, (state: NotesState) => state.isLoading);

export const getNoteById = (id: number) => createSelector(getNoteSTate, (allItems) => {
  if (allItems.notes) {
    return allItems.notes.find(item => {
      return item.id === id;
    });
  } else {
    return {} as Note;
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
