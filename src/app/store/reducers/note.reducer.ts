import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotesActions from '../actions/note.actions';
import * as AuthActions from '../actions/auth.action';
import { Note } from '../../models/note';
import { IAppRouterState, getAppRouterState } from './route.reducer';

export interface INotesState {
    notes: Note[];
    selectedNote: Note;
    opendNote: Note;
    facadeNote: Note;
    syncConflict: boolean;
    isLoading: boolean;
    isSyncing: boolean;
    isSyncingRequired: boolean;
}

const initialState: INotesState = {
    notes: [],
    selectedNote: null,
    opendNote: null,
    facadeNote: null,
    isLoading: false,
    isSyncing: false,
    isSyncingRequired: false,
    syncConflict: false
};

export const notesReducer = createReducer<INotesState>(
    initialState,
    on(AuthActions.logOutSuccess, (): INotesState => initialState),
    on(NotesActions.noteSelectSuccess, (state, action): INotesState => {
        localStorage.setItem('lastSelectedNote', action.note.note_id.toString());
        return {
            ...state,
            selectedNote: action.note,
            opendNote: action.note,
            facadeNote: action.note
        };
    }),
    on(NotesActions.createNoteSuccess, (state, action): INotesState => {
        localStorage.setItem('lastSelectedNote', action.note.note_id.toString());
        return {
            ...state,
            notes: pinnedNotes([action.note, ...state.notes]),
            selectedNote: action.note,
            opendNote: action.note,
            facadeNote: action.note
        };
    }),
    on(
        NotesActions.syncNotesStart,
        (state): INotesState => ({
            ...state,
            isSyncing: true
        })
    ),
    on(
        NotesActions.syncServer,
        (state): INotesState => ({
            ...state,
            isLoading: true
        })
    ),
    on(
        NotesActions.syncNotesFail,
        NotesActions.syncServerFail,
        (state): INotesState => ({
            ...state,
            isSyncing: false
        })
    ),
    on(NotesActions.syncRemoteWithLocalSuccess, (state, action): INotesState => {
        return {
            ...state,
            notes: pinnedNotes(dateModifiedNotes([...action.notes])),
            opendNote: opendNote(state, action.notes),
            selectedNote: opendNote(state, action.notes),
            facadeNote: facadeNote(state, action.notes),
            isSyncing: false,
            isLoading: false
        };
    }),
    on(NotesActions.syncRemoteNotesResponse, (state, action): INotesState => {
        if (state.opendNote) {
            const checkIfDeleted: Note = filterActiveNotes(action.remoteNotes).find(
                (n) => n.note_id === state.opendNote.note_id
            );

            if (checkIfDeleted === undefined && state.opendNote.sync) {
                return {
                    ...state,
                    opendNote: null,
                    selectedNote: null,
                    facadeNote: null
                };
            }

            const findOpendNote = action.remoteNotes.find((n) => n.note_id === state.opendNote.note_id);
            if (findOpendNote) {
                if (new Date(findOpendNote.date_modified) > new Date(state.opendNote.date_modified)) {
                    console.log('facade: ', state.facadeNote);
                    console.log('opendNote: ', state.opendNote);
                    console.log('findNote', findOpendNote);
                }
                return {
                    ...state,
                    syncConflict:
                        new Date(findOpendNote.date_modified) > new Date(state.opendNote.date_modified)
                };
            }
        }
        return {
            ...state
        };
    }),
    on(
        NotesActions.unselectNote,
        (state): INotesState => ({
            ...state,
            selectedNote: null,
            opendNote: null,
            facadeNote: null
        })
    ),
    on(
        NotesActions.searchSelect,
        (state, action): INotesState => ({
            ...state,
            selectedNote: action.selectedNote,
            opendNote: action.selectedNote,
            facadeNote: action.selectedNote
        })
    ),
    on(NotesActions.updateLocalNoteSuccess, (state, action): INotesState => {
        // const localNote = state.notes.find((n) => n.note_id === action.note.note_id);
        const notes: Note[] = state.notes.map((note) => {
            return note.note_id === action.localNote.note_id ? action.localNote : note; // First update the note
        });

        const newState: Note[] = [
            { ...notes.find((note) => note.note_id === action.localNote.note_id) }, // move the newly updated note to the top of the list
            ...notes.filter((n) => n.note_id !== action.localNote.note_id)
        ];
        let returnState = {
            ...state,
            notes: pinnedNotes(dateModifiedNotes(newState))
        };
        if (state.opendNote) {
            returnState = {
                ...returnState,
                opendNote: {
                    ...state.opendNote,
                    colour: action.localNote.colour,
                    selection: action.localNote.selection,
                    user_id: action.localNote.user_id,
                    date_created: action.localNote.date_created,
                    date_modified: action.localNote.date_modified,
                    date_archived: action.localNote.date_archived,
                    pin_order: action.localNote.pin_order,
                    archived: action.localNote.archived,
                    pinned: action.localNote.pinned,
                    active: action.localNote.active,
                    readonly: action.localNote.readonly,
                    spell_check: action.localNote.spell_check,
                    owner: action.localNote.owner
                },
                facadeNote: action.localNote
            };
            //check if archived
            if (action.localNote.archived) {
                if (state.opendNote.note_id === action.localNote.note_id) {
                    return {
                        ...returnState,
                        opendNote: opendNote({ ...state, opendNote: null }, undefined),
                        selectedNote: opendNote({ ...state, opendNote: null }, undefined),
                        facadeNote: opendNote({ ...state, opendNote: null }, undefined)
                    };
                }
            }

            if (state.opendNote.note_id === action.localNote.note_id) {
                return returnState;
            }
        }
        return {
            ...state,
            notes: pinnedNotes(dateModifiedNotes(newState))
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
        .sort((a, b) => (a.date_archived > b.date_archived ? -1 : 1));
});

export const getNotesLength = createSelector(
    getNoteState,
    (state: INotesState) => filterActiveNotes(state.notes).length
);

export const getSyncConflict = createSelector(getNoteState, (state: INotesState) => state.syncConflict);

export const getIsSyncingRequired = createSelector(getNoteState, (state: INotesState) =>
    state.notes.some((n) => !n.sync)
);

export const getSelectedNote = createSelector(getNoteState, (state: INotesState) =>
    state.selectedNote ? state.notes.find((n) => n.note_id === state.selectedNote.note_id) : new Note()
);

export const getOpendNote = createSelector(getNoteState, (state: INotesState) => state.opendNote as Note);

export const getFacadeNote = createSelector(getNoteState, (state: INotesState) => state.facadeNote as Note);

export const getIsNoteLoading = createSelector(getNoteState, (state: INotesState) => state.isLoading);

export const getIsSyncing = createSelector(getNoteState, (state: INotesState) => state.isSyncing);

export const getNoteById = (id: string) =>
    createSelector(getNoteState, (allItems) => {
        if (allItems.notes) {
            return allItems.notes.find((item) => {
                return item.note_id === id;
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
                return item.note_id === routerState.params['id'];
            });
        } else {
            return {};
        }
    }
);

export function opendNote(state: INotesState, remoteNotes?: Note[]): Note {
    if (state.opendNote !== null && remoteNotes !== undefined) {
        const findOpendNote = remoteNotes.find((n) => n.note_id === state.opendNote.note_id);
        if (findOpendNote === undefined && state.facadeNote.sync) return null;
        return {
            ...state.opendNote,
            colour: findOpendNote.colour,
            selection: findOpendNote.selection,
            user_id: findOpendNote.user_id,
            date_created: findOpendNote.date_created,
            date_modified: findOpendNote.date_modified,
            date_archived: findOpendNote.date_archived,
            pin_order: findOpendNote.pin_order,
            archived: findOpendNote.archived,
            pinned: findOpendNote.pinned,
            active: findOpendNote.active,
            readonly: findOpendNote.readonly,
            spell_check: findOpendNote.spell_check,
            owner: findOpendNote.owner
        };
    }

    if (state.opendNote === null && remoteNotes !== undefined) {
        const lastSelectedNote: Note = filterActiveNotes(remoteNotes).find(
            (n) => n.note_id === localStorage.getItem('lastSelectedNote')
        );

        let currentSelection: Note;

        if (lastSelectedNote === undefined)
            currentSelection = filterActiveNotes(pinnedNotes(remoteNotes))[0] ?? null;
        else currentSelection = lastSelectedNote;
        return currentSelection;
    }

    return null;
}

export function facadeNote(state: INotesState, remoteNotes?: Note[]): Note {
    if (state.opendNote !== null && remoteNotes !== undefined) {
        const findOpendNote = remoteNotes.find((n) => n.note_id === state.facadeNote.note_id);
        if (findOpendNote === undefined && state.facadeNote.sync) return null;
        return findOpendNote;
    }

    if (state.opendNote === null && remoteNotes !== undefined) {
        const lastSelectedNote: Note = filterActiveNotes(remoteNotes).find(
            (n) => n.note_id === localStorage.getItem('lastSelectedNote')
        );

        let currentSelection: Note;

        if (lastSelectedNote === undefined)
            currentSelection = filterActiveNotes(pinnedNotes(remoteNotes))[0] ?? null;
        else currentSelection = lastSelectedNote;
        return currentSelection;
    }

    return null;
}

export const dateModifiedNotes = (notes: Note[]) =>
    [...notes].sort(
        (a, b) =>
            new Date(b.local_date_modified ?? b.date_modified).getTime() -
            new Date(a.local_date_modified ?? a.date_modified).getTime()
    );

export const pinnedNotes = (notes: Note[]) =>
    [...notes].sort(
        (a, b) => Number(b.pinned) - Number(a.pinned) || (a.pinned ? a.pin_order - b.pin_order : 0)
    );

export function filterActiveNotes(notes: Note[]): Note[] {
    return notes.filter((n) => !n.archived && n.active);
}

export function filterArchivedNotes(notes: Note[]): Note[] {
    return notes.filter((n) => n.archived && n.active);
}
