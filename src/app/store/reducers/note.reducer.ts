import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.actions';
import { Note } from '../../models/note';
import { IAppRouterState, getAppRouterState } from './route.reducer';

export interface INotesState {
    notes: Note[];
    selectedNote: Note;
    opendNote: Note;
    isLoading: boolean;
    animate: {
        note: boolean;
        date: boolean;
    };
}

export const initialState: INotesState = {
    notes: [],
    selectedNote: null,
    opendNote: null,
    isLoading: false,
    animate: {
        note: false,
        date: false
    }
};

export const notesReducer = createReducer<INotesState>(
    initialState,
    on(
        NotesActions.noteSelect,
        (state, action): INotesState => ({
            ...state,
            selectedNote: action.payload,
            opendNote: action.payload
        })
    ),
    on(NotesActions.updateOpendNote, (state, action): INotesState => {
        return { ...state, opendNote: action.payload };
    }),
    on(NotesActions.createNoteSuccess, (state, action): INotesState => {
        return {
            ...state,
            notes: pinnedNotes([action.payload, ...state.notes]),
            selectedNote: action.payload,
            opendNote: action.payload,
            animate: {
                note: true,
                date: true
            }
        };
    }),
    on(
        NotesActions.fetchNotesStart,
        (state): INotesState => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        NotesActions.fetchNotesComplete,
        (state): INotesState => ({
            ...state,
            isLoading: false
        })
    ),
    on(NotesActions.fetchNotesSuccess, (state, action): INotesState => {
        return {
            ...state,
            notes: pinnedNotes(action.payload),
            selectedNote:
                pinnedNotes(action.payload)
                    .filter((n) => !n.archived)
                    .at(0) ?? null,
            opendNote:
                pinnedNotes(action.payload)
                    .filter((n) => !n.archived)
                    .at(0) ?? null,
            animate: {
                note: true,
                date: true
            }
        };
    }),
    on(
        NotesActions.updateNoteSuccess,
        NotesActions.updateNotePositionSuccess,
        NotesActions.updateNoteSizeSuccess,
        NotesActions.updateNoteHeaderSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            opendNote: action.payload,
            selectedNote: action.payload,
            animate: {
                note: true,
                date: true
            }
        })
    ),
    on(
        NotesActions.toggleSpellCheckSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            opendNote: action.payload,
            selectedNote: action.payload,
            animate: {
                note: false,
                date: false
            }
        })
    ),
    on(
        NotesActions.updateNoteSelectionSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            animate: {
                note: false,
                date: false
            }
        })
    ),
    on(NotesActions.restoreNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note; // First update the note text
        });

        const newState: Note[] = dateModifiedNotes(notes);

        return {
            ...state,
            notes: pinnedNotes(newState),
            animate: { ...state.animate, note: false, date: false }
        };
    }),
    on(NotesActions.updateNoteColourSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note; // First update the note text
        });

        return { ...state, notes: notes, animate: { ...state.animate, note: false, date: false } };
    }),
    on(NotesActions.updateNoteTextSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note; // First update the note text
        });

        const newState: Note[] = [
            // move the newly updated note to the top of the list
            notes.find((note) => note.id === action.payload.id),
            ...notes.filter((n) => n.id !== action.payload.id)
        ];

        return {
            ...state,
            notes: pinnedNotes(newState),
            animate: { ...state.animate, note: false, date: false }
        };
    }),
    on(NotesActions.updatePinOrder, (state, action): INotesState => {
        return action.payload.id === state.opendNote?.id // update current opend note
            ? { ...state, opendNote: { ...state.opendNote, pinOrder: action.payload.pinOrder } }
            : state;
    }),
    on(NotesActions.updatePinOrderSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note; // First update the note text
        });

        const newState: Note[] = [
            // move the newly updated note to the top of the list
            notes.find((note) => note.id === action.payload.id),
            ...notes.filter((n) => n.id !== action.payload.id)
        ];

        return {
            ...state,
            notes: pinnedNotes(dateModifiedNotes(newState)),
            animate: { note: true, date: false }
        };
    }),
    on(
        NotesActions.getNoteUpdatedTimestampSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) => {
                return note.id === action.payload.id
                    ? { ...note, dateModified: action.payload.dateModified }
                    : note;
            })
        })
    ),
    on(NotesActions.archiveNoteSuccess, NotesActions.deleteNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note;
        });

        return {
            ...state,
            notes: notes,
            selectedNote: null,
            opendNote: null,
            animate: { note: true, date: true }
        };
    })
);

export function dateModifiedNotes(notes: Note[]): Note[] {
    return notes.sort((a, b) => (a.dateModified > b.dateModified ? -1 : 1));
}

export function pinnedNotes(notes: Note[]): Note[] {
    return [
        ...notes.filter((note) => note.pinned).sort((a, b) => (a.pinOrder < b.pinOrder ? -1 : 1)),
        ...notes.filter((n) => !n.pinned)
    ];
}

export const getNoteState = createFeatureSelector<INotesState>('notes');

export const getNotes = createSelector(getNoteState, (state: INotesState) => {
    return state.notes.filter((n) => !n.archived && n.active);
});

export const getArchivedNotes = createSelector(getNoteState, (state: INotesState) => {
    return state.notes
        .filter((n) => n.archived && n.active)
        .sort((a, b) => (a.dateArchived > b.dateArchived ? -1 : 1));
});

export const getNotesLength = createSelector(
    getNoteState,
    (state: INotesState) => state.notes.filter((n) => !n.archived && n.active).length
);

export const getNotesAnimate = createSelector(getNoteState, (state: INotesState) => state.animate);

export const getSelectedNote = createSelector(getNoteState, (state: INotesState) =>
    state.selectedNote ? state.notes.find((n) => n.id === state.selectedNote.id) : new Note()
);

export const getOpendNote = createSelector(getNoteState, (state: INotesState) => state.opendNote as Note);

export const getIsLoading = createSelector(getNoteState, (state: INotesState) => state.isLoading);

export const getNoteById = (id: string) =>
    createSelector(getNoteState, (allItems) => {
        if (allItems.notes) {
            return allItems.notes.find((item) => {
                return item.id === id;
            });
        } else {
            return {} as Note;
        }
    });

export const getNoteCurrentRoute = createSelector(
    getNoteState,
    getAppRouterState,
    (state: INotesState, routerState: IAppRouterState) => {
        if (state.notes) {
            return state.notes.find((item) => {
                return item.id === routerState.params['id'];
            });
        } else {
            return {};
        }
    }
);
