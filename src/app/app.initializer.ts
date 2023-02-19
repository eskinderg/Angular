import { Store } from "@ngrx/store"
import { getDarkMode, logInSuccess } from "./actions/preference.action"
import { AppState } from "./reducers"
import { APP_INITIALIZER, Provider } from "@angular/core";
import * as EventsActions from './actions/event.action';
import * as NotesActions from './actions/note.action';
import { NullValidationHandler, OAuthService, OAuthSuccessEvent } from "angular-oauth2-oidc";
import { authConfig } from "./auth.config";

export const AppInit: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [Store],
    multi: true
  },
  {
    provide: APP_INITIALIZER,
    useFactory: initializeAppPref,
    deps: [OAuthService, Store],
    multi: true
  }
]

function initializeApp(store: Store<AppState>): () => void {
  return () => store.dispatch(getDarkMode())
}

function initializeAppPref(oauthService: OAuthService, store: Store<AppState>): () => void {
  return () => {

    oauthService.configure(authConfig)
    oauthService.tokenValidationHandler = new NullValidationHandler();
    oauthService.setStorage(localStorage);
    oauthService.loadDiscoveryDocumentAndTryLogin();

    oauthService.events.subscribe(event => {
      if (event instanceof OAuthSuccessEvent) {
        if (event.type === "token_received" || event.type === "discovery_document_loaded")
          if (oauthService.hasValidIdToken()) {
            // this.initialActions.forEach(action => this.store.dispatch(action));
            store.dispatch(logInSuccess({ isLoggedIn: true }))
            store.dispatch(EventsActions.fetchEvents());
            store.dispatch(NotesActions.fetchNotes());
          }
      }
    });
  }
}
