import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Store } from '@ngrx/store';

import * as fromProfile from '../../../../store/reducers/preference.reducer';
import * as ProfileActions from '../../../../store/actions/preference.action';
import { ThemeOptionComponent } from '../../../../fragments/components/appThemeOption/appThemeOption.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

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
        this.oauthService.initLoginFlow();
    }

    async logOut() {
        await this.oauthService
            .revokeTokenAndLogout()
            .then(() => {
                this.store.dispatch(ProfileActions.logOutSuccess());
            })
            .catch((error) => {
                alert('Error occured in the logout process');
                return Promise.reject(error);
            });
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
        this.store.dispatch(ProfileActions.toggleDarkMode());
    }
}
