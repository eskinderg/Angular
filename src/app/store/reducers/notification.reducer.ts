import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as NotificationActions from '../actions/notification.action';

export interface INotificationState {
    notifications: any[];
}

export const initialState: INotificationState = {
    notifications: []
};

export const notificationReducer = createReducer<INotificationState>(
    initialState,
    on(
        NotificationActions.newNotification,
        (state, action): INotificationState => ({
            ...state,
            notifications: [...state.notifications, action.payload]
        })
    ),
    on(
        NotificationActions.removeNotification,
        (state, action): INotificationState => ({
            ...state,
            notifications: state.notifications.filter((n) => n !== action.payload)
        })
    ),
    on(
        NotificationActions.clearNotification,
        (state): INotificationState => ({
            ...state,
            notifications: []
        })
    )
);

export const getNotificationState = createFeatureSelector<INotificationState>('notifications');

export const getNotifications = createSelector(
    getNotificationState,
    (state: INotificationState) => state.notifications
);
