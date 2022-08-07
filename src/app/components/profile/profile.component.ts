import { Component, HostBinding } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { OAuthService } from 'angular-oauth2-oidc';

import * as fromProfile from './../../reducers/profile.reducer';
import * as ProfileActions from './../../actions/profile.action';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileComponent {

  @HostBinding('@routerFadeInAnimation')

  public x: number;
  public y: number;
  public user: any;
  isDarkMode: Observable<boolean>;

  constructor(
    private authService: OAuthService,
    public store: Store<fromProfile.ProfileState>
  ) {
    this.user = this.authService.getIdentityClaims();
    this.isDarkMode = this.store.select(fromProfile.isDarkMode)
  }

  onDarkModeToggle(isDarkMode: boolean) {
    this.store.dispatch(ProfileActions.toggleDarkMode({ isDarkMode: isDarkMode }))
  }

}
