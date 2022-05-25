import { Component, HostBinding, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/shared/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [fadeInAnimation]
})
export class ProfileComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public x: number;
  public y: number;
  public user: any;
  public theme: any = new FormControl();

  constructor(private authService: OAuthService, public themeService: ThemeService) {
    this.user = this.authService.getIdentityClaims();
    this.theme.value = this.themeService.current;
  }

  ngOnInit() { }

  public onThemeChange(theme: any) {
    this.themeService.current = theme;
  }

}
