import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as EventsActions from '../actions/event.action';
import * as PreferenceActions from '../actions/preference.action';
import { Event } from '../../fragments/components/event/event';

export interface IEventsState {
    events: Event[];
    isLoading: boolean;
}

const initialState: IEventsState = {
    events: [],
    isLoading: false
};

export const eventsReducer = createReducer<IEventsState>(
    initialState,
    on(PreferenceActions.logOutSuccess, (): IEventsState => initialState),
    on(EventsActions.eventsClear, (state) => ({
        ...state,
        events: []
    })),
    on(
        EventsActions.createEventSuccess,
        (state, action): IEventsState => ({
            ...state,
            events: [action.event, ...state.events]
        })
    ),
    on(
        EventsActions.fetchEventsSuccess,
        (state, action): IEventsState => ({
            ...state,
            events: action.events.slice().reverse() || [] // reverse array to show the most recent
        })
    ),
    on(
        EventsActions.toggleEventSuccess,
        EventsActions.updateEventSuccess,
        (state, action): IEventsState => ({
            ...state,
            events: state.events.map((event) => {
                return event.id === action.event.id ? action.event : event;
            })
        })
    ),
    on(
        EventsActions.deleteEventSuccess,
        (state, action): IEventsState => ({
            ...state,
            events: state.events.filter((event: Event) => {
                return event.id !== action.event.id;
            })
        })
    ),
    on(EventsActions.fetchEventsStart, (state): IEventsState => ({ ...state, isLoading: true })),
    on(EventsActions.fetchEventsComplete, (state): IEventsState => ({ ...state, isLoading: false })),
    on(
        EventsActions.deleteEventsSuccess,
        (state, action): IEventsState => ({
            ...state,
            events: state.events.filter((event: Event) => {
                return action.events.every((e) => e.id !== event.id);
            })
        })
    )
);

export const getEventState = createFeatureSelector<IEventsState>('events');

export const getEvents = createSelector(getEventState, (state: IEventsState) => state.events);

export const getEventsLength = createSelector(getEventState, (state: IEventsState) => state.events.length);

export const getIsLoading = createSelector(getEventState, (state: IEventsState) => state.isLoading);

export const getItemById = (id: string) =>
    createSelector(getEventState, (allItems) => {
        if (allItems.events) {
            return allItems.events.find((item) => {
                return item.id === id;
            });
        } else {
            return {};
        }
    });
