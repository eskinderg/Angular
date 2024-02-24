import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';
import { authConfig } from './auth.config';
import { logInSuccess } from '../store/actions';
import { ToastService } from '../shared/toast/toast.service';
import { LoggingService } from '../error/loggingservice';

export function initializeAuth(
  oauthService: OAuthService,
  store: Store,
  toast: ToastService,
  loggingService: LoggingService
) {
  oauthService.configure(authConfig);
  oauthService.setStorage(sessionStorage);

  return async () => {
    await oauthService.loadDiscoveryDocumentAndTryLogin({
      onLoginError: (err: AuthorizationErrorResponse) => {
        loggingService.error(`Error Code: ${err.error}, Error Description: ${err.error_description}`);
      }
    });

    if (oauthService.hasValidAccessToken()) {
      store.dispatch(logInSuccess());
    } else {
      toast.showStandard('No valid access_token');
    }
    return true;
  };
}
type AuthorizationError =
  | 'invalid_request'
  | 'unauthorized_client'
  | 'access_denied'
  | 'unsupported_response_type'
  | 'invalid_scope'
  | 'server_error'
  | 'temporarily_unavailable';

export interface AuthorizationErrorResponse {
  error: AuthorizationError;
  error_description?: string;
  error_uri?: URL;
  state?: string;
}
