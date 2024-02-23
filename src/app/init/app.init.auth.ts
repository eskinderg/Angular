import { NullValidationHandler, OAuthService, OAuthSuccessEvent } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from '../auth.config';
import { isLoggedIn } from '../store/reducers/preference.reducer';
import { logInSuccess } from '../store/actions';
import { IAppState } from '../store/reducers';
import { take } from 'rxjs';

export function initializeAuth(oauthService: OAuthService, store: Store<IAppState>): () => void {
  return () => {
    store
      .select(isLoggedIn)
      .pipe(take(1))
      .subscribe((isUserLoggedIn) => {
        // avaoid long observable subscription
        if (!isUserLoggedIn) {
          oauthService.configure(authConfig);
          oauthService.tokenValidationHandler = new NullValidationHandler();
          oauthService.setStorage(localStorage);
          oauthService.loadDiscoveryDocumentAndTryLogin();
        }
      });

    oauthService.events.subscribe((event) => {
      if (event instanceof OAuthSuccessEvent) {
        if (event.type === 'token_received' || event.type === 'discovery_document_loaded')
          if (oauthService.hasValidIdToken()) {
            store.dispatch(logInSuccess());
          }
      }
    });
  };
}
