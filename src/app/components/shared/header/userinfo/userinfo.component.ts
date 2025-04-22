import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';

import * as fromProfile from '../../../../store/reducers/preference.reducer';
import * as PreferenceActions from '../../../../store/actions/preference.action';
import { ThemeOptionComponent } from '../../../../fragments/components/appThemeOption/appThemeOption.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { authConfig } from 'src/app/auth/auth.config';

@Component({
    selector: 'app-userinfo',
    templateUrl: 'userinfo.component.html',
    styleUrls: ['userinfo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThemeOptionComponent, RouterLink, AsyncPipe]
})
export class UserInfoComponent {
    claims: any;
    name: any;

    @Output() signout: EventEmitter<any> = new EventEmitter();

    constructor(
        private oauthService: OAuthService,
        public store: Store<fromProfile.IPreferenceState>
    ) {}

    get DarkMode() {
        return this.store.select(fromProfile.isDarkMode);
    }

    login() {
        // this.router.navigate(['login']);
        this.oauthService.configure(authConfig);
        this.oauthService
            .loadDiscoveryDocumentAndTryLogin()
            .then(() => {
                if (!this.oauthService.hasValidAccessToken()) {
                    this.oauthService.initCodeFlow();
                }
            })
            .catch((err) => {
                console.error('Error loading discovery document or logging in', err);
            });
    }

    async logOut() {
        const idToken = this.oauthService.getIdToken();

        if (idToken) {
            await this.oauthService
                .revokeTokenAndLogout()
                .then(() => this.store.dispatch(PreferenceActions.logOutSuccess()))
                .catch((error) => {
                    alert('Logout failed');
                    return Promise.reject(error);
                });
        } else {
            delete this.oauthService.logoutUrl;
            this.oauthService.logOut(false);
            this.store.dispatch(PreferenceActions.logOutSuccess());
        }
    }

    get isLoggedIn() {
        return this.store.select(fromProfile.isLoggedIn);
    }

    get givenName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['given_name'];
    }

    onDarkModeToggle() {
        this.store.dispatch(PreferenceActions.toggleDarkMode());
    }
}
