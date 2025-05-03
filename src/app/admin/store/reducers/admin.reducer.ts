import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Note } from 'src/app/models/note';
import * as AdminNotesActions from '../actions/admin.auth.action';

export interface IAdminNotesState {
    notes: Note[];
    selectedNote: Note;
    users: [string, string, number][];
    isLoading: boolean; // not being used
}

export const initialState: IAdminNotesState = {
    notes: [],
    selectedNote: null,
    users: [],
    isLoading: false
};

export const adminReducer = createReducer<IAdminNotesState>(
    initialState,
    on(AdminNotesActions.adminNoteSelect, (state, action): IAdminNotesState => {
        return {
            ...state,
            selectedNote: action.payload
        };
    }),
    on(AdminNotesActions.adminFetchNotes, (state): IAdminNotesState => {
        return {
            ...state,
            isLoading: true
        };
    }),
    on(AdminNotesActions.adminFetchNotesSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            isLoading: false,
            notes: action.payload
        };
    }),
    on(AdminNotesActions.adminFetchUsersSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            isLoading: false,
            users: action.payload
        };
    }),
    on(
        AdminNotesActions.adminUpdateNoteSuccess,
        (state, action): IAdminNotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.id === action.payload.id || note.id === undefined ? action.payload : note
            ),
            selectedNote: null
        })
    ),
    on(
        AdminNotesActions.adminNoteUnSelect,
        (state): IAdminNotesState => ({
            ...state,
            selectedNote: null
        })
    ),
    on(AdminNotesActions.adminBulkUpdateNotesSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            notes: state.notes.map((note) => {
                const updatedNote = action.payload.find((n) => n.id === note.id);
                return updatedNote ? updatedNote : note;
            }),
            selectedNote: null
        };
    })
);

export const getAdminNoteState = createFeatureSelector<IAdminNotesState>('admin');

export const getAdminNotes = createSelector(getAdminNoteState, (state: IAdminNotesState) => {
    return state.notes;
});

export const getAdminNotesTotalCount = createSelector(getAdminNoteState, (state: IAdminNotesState) => {
    return state.notes.length;
});

export const getAdminUsers = createSelector(getAdminNoteState, (state: IAdminNotesState) => {
    return state.users;
});

export const getAdminSelectedNote = createSelector(getAdminNoteState, (state: IAdminNotesState) =>
    state.selectedNote ? state.notes.find((n) => n.id === state.selectedNote.id) : null
);
