import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { OAuthService } from 'angular-oauth2-oidc';

import * as fromProfile from './../../store/reducers/preference.reducer';
import * as ProfileActions from './../../store/actions/preference.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../fragments/components/card/card.component';
import { ThemeOptionComponent } from '../../fragments/components/appThemeOption/appThemeOption.component';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    animations: [fadeInAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardComponent, ThemeOptionComponent, FormsModule, AsyncPipe]
})
export class ProfileComponent {
    private authService = inject(OAuthService);
    store = inject<Store<fromProfile.IPreferenceState>>(Store);

    @HostBinding('@routerFadeInAnimation')
    public x: number;
    public y: number;
    public user: any;
    isDarkMode: Observable<string>;

    constructor() {
        this.user = this.authService.getIdentityClaims();
        this.isDarkMode = this.store.select(fromProfile.isDarkMode);
    }

    onDarkModeToggle() {
        this.store.dispatch(ProfileActions.toggleDarkMode());
    }
}
