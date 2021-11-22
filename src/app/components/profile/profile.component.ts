import { Component, HostListener, HostBinding, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Observable } from 'rxjs';
import { ConfirmService } from '../../theme/components/modal/confirm.service';
import { OAuthService } from 'angular-oauth2-oidc';
/**
 * This class represents the lazy loaded ProfileComponent.
 */
@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [ fadeInAnimation ]
})
export class ProfileComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public x: number;
  public y: number;
  public user: any;

  constructor(private authService: OAuthService) {
    this.user = this.authService.getIdentityClaims();
  }

  ngOnInit() { }


  @HostListener('window:resize', ['$event'] )
  public onWindowResize($event: any): void {
    // console.log($event);
    // this.x = $event.currentTarget.innerWidth;
    // this.y = $event.currentTarget.innerHeight;
  }

}
