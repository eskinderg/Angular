import { createAction, props } from '@ngrx/store';

/**
 List of profile messages
 **/

export const toggleDarkMode = createAction(
  '[PROFILE] TOGGLE_DARK_MODE',
  props<{ isDarkMode: boolean }>()
)

export const toggleDarkModeSuccess = createAction(
  '[PROFILE] TOGGLE_DARK_MODE_SUCCESS',
  props<{ isDarkMode: boolean }>()
)

export const getDarkMode = createAction(
  '[PROFILE] GET_DARK_MODE'
)

export const getDarkModeSuccess = createAction(
  '[PROFILE] GET_DARK_MODE_SUCCESS',
  props<{ isDarkMode: boolean }>()
)

