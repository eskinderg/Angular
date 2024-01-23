import { Data, Params } from "@angular/router";
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface AppRouterState {
  url         : string;
  params      : Params;
  queryParams : Params;
  data        : Data;
}

export const routerState = createFeatureSelector<RouterReducerState<AppRouterState>>('router');

export const getAppRouterState = createSelector(
  routerState, router => router.state
)

// export const getRouterStateParams = createSelector(
//   getAppRouterState,
//   state => state.params
// );

// `router` is used as the default feature name. You can use the feature name
// of your choice by creating a feature selector and pass it to the `getRouterSelectors` function
// export const selectRouter = createFeatureSelector<RouterReducerState>('yourFeatureName');

// export const {
//   selectCurrentRoute   , // select the current route
//   selectFragment       , // select the current route fragment
//   selectQueryParams    , // select the current route query params
//   selectQueryParam     , // factory function to select a query param
//   selectRouteParams    , // select the current route params
//   selectRouteParam     , // factory function to select a route param
//   selectRouteData      , // select the current route data
//   selectRouteDataParam , // factory function to select a route data param
//   selectUrl            , // select the current url
//   selectTitle          , // select the title if available
// } = getRouterSelectors(routerState);
