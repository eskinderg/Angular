import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.actions';
import * as PreferenceActions from '../actions/preference.action';
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

const initialState: INotesState = {
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
    on(PreferenceActions.logOutSuccess, (state, action): INotesState => initialState),
    on(NotesActions.noteSelect, (state, action): INotesState => {
        localStorage.setItem('lastSelectedNote', action.note.id.toString());
        return {
            ...state,
            selectedNote: action.note,
            opendNote: action.note,
            facadeNote: action.note
        };
    }),
    on(NotesActions.updateOpendNote, (state, action): INotesState => {
        return { ...state, opendNote: action.note, facadeNote: action.note };
    }),
    on(NotesActions.createNoteSuccess, (state, action): INotesState => {
        return {
            ...state,
            notes: pinnedNotes([action.note, ...state.notes]),
            selectedNote: action.note,
            opendNote: action.note,
            facadeNote: action.note,
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
        const lastSelectedNote: Note = filterActiveNotes(action.notes).find(
            (n) => n.id === localStorage.getItem('lastSelectedNote')
        );

        let currentSelection: Note;

        if (lastSelectedNote === undefined)
            currentSelection = filterActiveNotes(pinnedNotes(action.notes))[0] ?? null;
        else currentSelection = lastSelectedNote;

        return {
            ...state,
            notes: pinnedNotes(action.notes),
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
            const checkIfDeleted: Note = filterActiveNotes(action.notes).find(
                (n) => n.id === state.opendNote.id
            );
            if (checkIfDeleted === undefined) {
                return {
                    ...state,
                    opendNote: null,
                    selectedNote: null,
                    facadeNote: null,
                    notes: pinnedNotes(action.notes),
                    animate: {
                        note: false,
                        date: true
                    }
                };
            }
        }
        return {
            ...state,
            notes: pinnedNotes(action.notes),
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
                note.id === action.note.id || note.id === undefined ? action.note : note
            ),
            opendNote: action.note,
            selectedNote: action.note,
            facadeNote: action.note,
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
                note.id === action.note.id || note.id === undefined ? action.note : note
            ),
            opendNote: action.note,
            selectedNote: action.note,
            facadeNote: action.note,
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
                note.id === action.note.id || note.id === undefined ? action.note : note
            ),
            opendNote: action.note,
            selectedNote: action.note,
            facadeNote: action.note,
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
                note.id === action.note.id || note.id === undefined ? action.note : note
            ),
            opendNote: action.note,
            selectedNote: action.note,
            facadeNote: action.note,
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
            return note.id === action.note.id ? action.note : note; // First update the note text
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
            return note.id === action.note.id ? action.note : note; // First update the note text
        });

        return {
            ...state,
            notes: notes,
            facadeNote: action.note,
            animate: { ...state.animate, note: false, date: false }
        };
    }),
    on(NotesActions.updateNoteTextSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.note.id ? action.note : note; // First update the note text
        });

        const newState: Note[] = [
            // move the newly updated note to the top of the list
            notes.find((note) => note.id === action.note.id),
            ...notes.filter((n) => n.id !== action.note.id)
        ];

        return {
            ...state,
            notes: pinnedNotes(newState),
            facadeNote: action.note,
            animate: { ...state.animate, note: false, date: false }
        };
    }),
    on(NotesActions.updatePinOrder, (state, action): INotesState => {
        return action.note.id === state.opendNote?.id // update current opend note
            ? {
                  ...state,
                  opendNote: { ...state.opendNote, pinOrder: action.note.pinOrder },
                  facadeNote: { ...state.facadeNote, pinOrder: action.note.pinOrder }
              }
            : state;
    }),
    on(NotesActions.updatePinOrderSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.note.id ? action.note : note; // First update the note text
        });

        const newState: Note[] = [
            // move the newly updated note to the top of the list
            notes.find((note) => note.id === action.note.id),
            ...notes.filter((n) => n.id !== action.note.id)
        ];

        return {
            ...state,
            notes: pinnedNotes(dateModifiedNotes(newState)),
            facadeNote: action.note.id === state.facadeNote.id ? action.note : state.facadeNote,
            animate: { note: true, date: false }
        };
    }),
    on(
        NotesActions.getNoteUpdatedTimestampSuccess,
        (state, action): INotesState => ({
            ...state,
            notes: state.notes.map((note) => {
                return note.id === action.note.id
                    ? { ...note, dateModified: action.note.dateModified }
                    : note;
            })
        })
    ),
    on(NotesActions.archiveNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.note.id ? action.note : note;
        });

        return {
            ...state,
            notes: notes,
            selectedNote: action.note.id === state.selectedNote?.id ? null : state.selectedNote,
            opendNote: action.note.id === state.opendNote?.id ? null : state.opendNote,
            animate: { note: true, date: true }
        };
    }),
    on(NotesActions.deleteNoteSuccess, (state, action): INotesState => {
        const notes: Note[] = state.notes.map((note) => {
            return note.id === action.note.id ? action.note : note;
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

export const getIsNoteLoading = createSelector(getNoteState, (state: INotesState) => state.isLoading);

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
