import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Note } from 'src/app/models/note';
import * as AdminNotesActions from '../actions/admin.auth.action';
import { User } from '../../models/user';

export interface IAdminNotesState {
    notes: Note[];
    selectedNote: Note;
    usersInfos: { owner: string; user_id: string; total_notes: number; active_notes: number }[];
    isLoading: boolean; // not being used
    users: User[];
}

export const initialState: IAdminNotesState = {
    notes: [],
    selectedNote: null,
    usersInfos: [],
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
    on(AdminNotesActions.adminFetchUsersInfoSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            isLoading: false,
            usersInfos: action.payload
        };
    }),
    on(
        AdminNotesActions.adminUpdateNoteSuccess,
        (state, action): IAdminNotesState => ({
            ...state,
            notes: state.notes.map((note) =>
                note.note_id === action.payload.note_id || note.note_id === undefined ? action.payload : note
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
                const updatedNote = action.payload.find((n) => n.note_id === note.note_id);
                return updatedNote ? updatedNote : note;
            }),
            selectedNote: null
        };
    }),
    on(AdminNotesActions.adminFetchUsersSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            isLoading: false,
            users: action.payload
        };
    }),
    on(AdminNotesActions.adminBulkUpdateUsersSuccess, (state, action): IAdminNotesState => {
        return {
            ...state,
            users: state.users.map((user) => {
                const updatedUser = action.payload.find((u) => u.id === user.id);
                return updatedUser ? updatedUser : user;
            })
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

export const getAdminUsersInfo = createSelector(getAdminNoteState, (state: IAdminNotesState) => {
    return state.usersInfos;
});

export const getAdminUsers = createSelector(getAdminNoteState, (state: IAdminNotesState) => {
    return state.users;
});

export const getAdminSelectedNote = createSelector(getAdminNoteState, (state: IAdminNotesState) =>
    state.selectedNote ? state.notes.find((n) => n.note_id === state.selectedNote.note_id) : null
);
