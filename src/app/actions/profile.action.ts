import { createAction, props } from '@ngrx/store';

/**
 List of profile messages
 **/

export const setTheme = createAction(
  '[PROFILE] THEME_SET',
  props<{ theme?: string }>()
)


export const setThemeSuccess = createAction(
  '[PROFILE] THEME_SET_SUCCESS',
  props<{ theme?: string }>()
)

export const getTheme = createAction(
  '[PROFILE] THEME_GET'
)

export const getThemeSuccess = createAction(
  '[PROFILE] THEME_GET_SUCCESS',
  props<{ theme?: string }>()
)
