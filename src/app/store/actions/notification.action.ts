import { createAction, props } from '@ngrx/store';
/*
 List of notification messages
 */

export const newNotification = createAction(
    '[NOTIFICATION] NEW_NOTIFICATION',
    props<{ notification: any }>()
);

export const removeNotification = createAction(
    '[NOTIFICATION] REMOVE_NOTIFICATION',
    props<{ notification: any }>()
);

export const clearNotification = createAction('[NOTIFICATION] CLEAR_NOTIFICATION');
