import { Component, HostBinding, OnDestroy } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { OAuthService } from 'angular-oauth2-oidc';
import { UntypedFormControl } from '@angular/forms';

import * as fromProfile from './../../reducers/profile.reducer';
import * as ProfileActions from './../../actions/profile.action';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnDestroy {

  @HostBinding('@routerFadeInAnimation')

  public x: number;
  public y: number;
  public user: any;
  public theme: any = new UntypedFormControl();
  themeSubscription: Subscription;

  constructor(
    private authService: OAuthService,
    private store: Store<fromProfile.ProfileState>
  ) {
    this.user = this.authService.getIdentityClaims();

    this.themeSubscription = this.store.select(fromProfile.getTheme).subscribe((theme) => {
      this.theme.value = theme;
    })
  }

  public onThemeChange(theme: any) {
    this.store.dispatch(ProfileActions.setTheme({ theme: theme }))
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
