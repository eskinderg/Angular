import { Component, EventEmitter, Output, ChangeDetectionStrategy, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';

import * as fromProfile from '../../../../store/reducers/preference.reducer';
import * as fromAuth from '../../../../store/reducers/auth.reducer';
import * as AuthActions from '../../../../store/actions/auth.action';
import * as PreferenceActions from '../../../../store/actions/preference.action';
import { ThemeOptionComponent } from '../../../../fragments/components/appThemeOption/appThemeOption.component';
import { Router, RouterLink } from '@angular/router';
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
    private oauthService = inject(OAuthService);
    private router = inject(Router);
    store = inject<Store<fromProfile.IPreferenceState>>(Store);

    claims: any;
    name: any;

    @Output() signout: EventEmitter<any> = new EventEmitter();

    get DarkMode() {
        return this.store.select(fromProfile.isDarkMode);
    }

    login() {
        this.router.navigate(['login']);
        return;
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
        this.store.dispatch(AuthActions.logout({ message: 'user initiated' }));
    }

    get isLoggedIn() {
        return this.store.select(fromAuth.isLoggedIn);
    }

    get username() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['name'] ?? claims['preferred_username'];
    }

    onDarkModeToggle() {
        this.store.dispatch(PreferenceActions.toggleDarkMode());
    }
}
