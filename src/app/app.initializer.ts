import { APP_INITIALIZER, Provider } from "@angular/core";
import { Store, Action } from "@ngrx/store"
import { NullValidationHandler, OAuthService, OAuthSuccessEvent } from "angular-oauth2-oidc";
import { logIn, getDarkMode, fetchEvents, fetchNotes } from "./actions";
import { AppState } from "./reducers"
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

const initActions: Action[] = [
  logIn(),
  fetchEvents(),
  fetchNotes()
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
            initActions.forEach((action: Action) => {
              store.dispatch(action);
            });
          }
      }
    });
  }
}
