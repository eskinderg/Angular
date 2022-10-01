import { createAction, props } from '@ngrx/store';

/**
 List of profile messages
 **/

export const toggleDarkMode = createAction(
  '[PREFERENCE] TOGGLE_DARK_MODE',
  props<{ isDarkMode: boolean }>()
)

export const toggleDarkModeSuccess = createAction(
  '[PREFERENCE] TOGGLE_DARK_MODE_SUCCESS',
  props<{ isDarkMode: boolean }>()
)

export const getDarkMode = createAction(
  '[PREFERENCE] GET_DARK_MODE'
)

export const getDarkModeSuccess = createAction(
  '[PREFERENCE] GET_DARK_MODE_SUCCESS',
  props<{ isDarkMode: boolean }>()
)

