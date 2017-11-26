// import * as fromEvents from '../../../reducers/events';
// import * as fromRoot from '../../../reducers';
// import {createFeatureSelector, createSelector} from '@ngrx/store';

// export interface ContactsState {
//   contacts: fromEvents.State
// }

// // This is a lazy loaded state, so we need to extend from the App Root State
// export interface State extends fromRoot.State {
//   contacts: ContactsState
// }

// export const reducers = {
//   contacts: fromEvents.reducer
// };

// export const getContactsRootState = createFeatureSelector<ContactsState>('contacts');

// export const getContactsState = createSelector(
//     getContactsRootState,
//     state => state.contacts
// );

// export const getSelectedContactId = createSelector(
//   getContactsState,
//   fromEvents.getCurrentContactId
// );

// export const {
//   selectAll: getAllContacts,
//   selectEntities: getContactEntities
// } = fromEvents.contactsAdapter.getSelectors(getContactsState);

// export const getCurrentContact = createSelector(
//   getContactEntities,
//   getSelectedContactId,
//   (entities, id) => id && entities[id]
// );
