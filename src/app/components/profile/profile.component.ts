import { Component, HostListener, HostBinding, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SlideAnimation } from '../shared/animations/animations';
import { fadeInAnimation } from '../shared/animations/fadeInAnimation';
import { Observable } from 'rxjs/Observable';
import { ConfirmService } from '../../theme/components/modal/confirm.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { User } from 'oidc-client';
/**
 * This class represents the lazy loaded ProfileComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [ fadeInAnimation ]
})
export class ProfileComponent implements OnInit {

  @HostBinding('@routerFadeInAnimation')

  public x: number;
  public y: number;
  public user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.currentUser;
  }

  ngOnInit() { }


  @HostListener('window:resize', ['$event'] )
  public onWindowResize($event: any): void {
      // console.log($event);
      // this.x = $event.currentTarget.innerWidth;
      // this.y = $event.currentTarget.innerHeight;
  }

}
