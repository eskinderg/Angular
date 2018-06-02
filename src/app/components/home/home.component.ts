import { Component, OnInit, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { SlideAnimation } from '../shared/animations/animations';
import { Tv } from '../movies/models/tv';
import { EventApiService } from '../../theme/components/event/event.data.service/event.api.service';
import { OAuthService } from 'angular-oauth2-oidc';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
  animations: [fadeInAnimation]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public tvs: Tv[];
  public events$;

  constructor( private oauthService: OAuthService, private route: ActivatedRoute, private eventApiService: EventApiService) {
  }

  ngOnInit() {
    this.tvs = this.route.snapshot.data['tvs'];
    this.events$ = this.eventApiService.getAllEvents();
    this.oauthService.events.subscribe(e => {
      console.log('oauth/oidc event', e);
    });
    // this.oauthService.loadUserProfile().then(up => (console.log(up)));
  }

  login(){
    this.events$ = this.eventApiService.getAllEvents();
  }

  // login(){

  //   this.oauthService
  //     .fetchTokenUsingPasswordFlowAndLoadUserProfile(
  //       "Kukusha",
  //       "123001"
  //     )
  //     .then(() => {
  //       console.log('successfully logged in');
  //       var token = this.oauthService.getAccessToken();
  //       this.oauthService.loadUserProfile().then(up => (console.log(up)));
  //       console.log(token);
  //       // this.loginFailed = false;
  //     })
  //     .catch(err => {
  //       console.log('sample');
  //       console.log(err);
  //       // console.error('error logging in', err);
  //       // this.loginFailed = true;
  //     });
  // }

}
