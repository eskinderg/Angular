import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.actions';
import { Note } from '../../models/note';
import { IAppRouterState, getAppRouterState } from './route.reducer';

export interface INotesState {
    notes: Note[];
    selectedNote: Note;
    opendNote: Note;
    facadeNote: Note;
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
    facadeNote: null,
    isLoading: false,
    animate: {
        note: false,
        date: false
    }
};

export const notesReducer = createReducer<INotesState>(
    initialState,
    on(NotesActions.noteSelect, (state, action): INotesState => {
        localStorage.setItem('lastSelectedNote', action.payload.id.toString());
        return {
            ...state,
            selectedNote: action.payload,
            opendNote: action.payload,
            facadeNote: action.payload
        };
    }),
    on(NotesActions.updateOpendNote, (state, action): INotesState => {
        return { ...state, opendNote: action.payload, facadeNote: action.payload };
    }),
    on(NotesActions.createNoteSuccess, (state, action): INotesState => {
        return {
            ...state,
            notes: pinnedNotes([action.payload, ...state.notes]),
            selectedNote: action.payload,
            opendNote: action.payload,
            facadeNote: action.payload,
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
        const lastSelectedNote: Note = filterActiveNotes(action.payload).find(
            (n) => n.id === localStorage.getItem('lastSelectedNote')
        );

        let currentSelection: Note;

        if (lastSelectedNote === undefined)
            currentSelection = filterActiveNotes(pinnedNotes(action.payload))[0] ?? null;
        else currentSelection = lastSelectedNote;

        return {
            ...state,
            notes: pinnedNotes(action.payload),
            selectedNote: currentSelection,
            opendNote: currentSelection,
            facadeNote: currentSelection,
            animate: {
                note: true,
                date: true
            }
        };
    }),
    on(NotesActions.refreshNotesSuccess, (state, action): INotesState => {
        if (state.opendNote != null) {
            const checkIfDeleted: Note = filterActiveNotes(action.payload).find(
                (n) => n.id === state.opendNote.id
            );
            if (checkIfDeleted === undefined) {
                return {
                    ...state,
                    opendNote: null,
                    selectedNote: null,
                    facadeNote: null,
                    notes: pinnedNotes(action.payload),
                    animate: {
                        note: false,
                        date: true
                    }
                };
            }
        }
        return {
            ...state,
            notes: pinnedNotes(action.payload),
            animate: {
                note: false,
                date: true
            }
        };
    }),
    on(
        NotesActions.updateNoteSuccess,
        NotesActions.updateNotePositionSuccess,
        NotesActions.updateNoteSizeSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            opendNote: action.payload,
            selectedNote: action.payload,
            facadeNote: action.payload,
            animate: {
                note: true,
                date: true
            }
        })
    ),
    on(
        NotesActions.updateNoteHeaderSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            opendNote: action.payload,
            selectedNote: action.payload,
            facadeNote: action.payload,
            animate: {
                note: false,
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
            facadeNote: action.payload,
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
            opendNote: action.payload,
            selectedNote: action.payload,
            facadeNote: action.payload,
            animate: {
                note: false,
                date: false
            }
        })
    ),
    on(
        NotesActions.unselectNote,
        (state): INotesState => ({
            ...state,
            selectedNote: null,
            opendNote: null,
            facadeNote: null
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

        return {
            ...state,
            notes: notes,
            facadeNote: action.payload,
            animate: { ...state.animate, note: false, date: false }
        };
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
            facadeNote: action.payload,
            animate: { ...state.animate, note: false, date: false }
        };
    }),
    on(NotesActions.updatePinOrder, (state, action): INotesState => {
        return action.payload.id === state.opendNote?.id // update current opend note
            ? {
                  ...state,
                  opendNote: { ...state.opendNote, pinOrder: action.payload.pinOrder },
                  facadeNote: { ...state.facadeNote, pinOrder: action.payload.pinOrder }
              }
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
            facadeNote: action.payload.id === state.facadeNote.id ? action.payload : state.facadeNote,
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
    on(NotesActions.archiveNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note;
        });

        return {
            ...state,
            notes: notes,
            selectedNote: action.payload.id === state.selectedNote?.id ? null : state.selectedNote,
            opendNote: action.payload.id === state.opendNote?.id ? null : state.opendNote,
            animate: { note: true, date: true }
        };
    }),
    on(NotesActions.deleteNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.payload.id ? action.payload : note;
        });

        return {
            ...state,
            notes: notes
        };
    })
);

export const getNoteState = createFeatureSelector<INotesState>('notes');

export const getNotes = createSelector(getNoteState, (state: INotesState) => {
    return filterActiveNotes(state.notes);
});

export const getArchivedNotes = createSelector(getNoteState, (state: INotesState) => {
    return state.notes
        .filter((n) => n.archived && n.active)
        .sort((a, b) => (a.dateArchived > b.dateArchived ? -1 : 1));
});

export const getNotesLength = createSelector(
    getNoteState,
    (state: INotesState) => filterActiveNotes(state.notes).length
);

export const getNotesAnimate = createSelector(getNoteState, (state: INotesState) => state.animate);

export const getSelectedNote = createSelector(getNoteState, (state: INotesState) =>
    state.selectedNote ? state.notes.find((n) => n.id === state.selectedNote.id) : new Note()
);

export const getOpendNote = createSelector(getNoteState, (state: INotesState) => state.opendNote as Note);

export const getFacadeNote = createSelector(getNoteState, (state: INotesState) => state.facadeNote as Note);

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

export function dateModifiedNotes(notes: Note[]): Note[] {
    return notes.sort((a, b) => (a.dateModified > b.dateModified ? -1 : 1));
}

export function pinnedNotes(notes: Note[]): Note[] {
    return [
        ...notes.filter((note) => note.pinned).sort((a, b) => (a.pinOrder < b.pinOrder ? -1 : 1)),
        ...notes.filter((n) => !n.pinned)
    ];
}

export function filterActiveNotes(notes: Note[]): Note[] {
    return notes.filter((n) => !n.archived && n.active);
}
