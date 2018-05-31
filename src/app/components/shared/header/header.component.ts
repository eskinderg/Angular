import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

/**
 * This class represents the Header Component.
 */
@Component({
  selector: 'sd-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss'],
})
export class HeaderComponent implements OnInit {


  @Output() signout: EventEmitter<any> = new EventEmitter();
  public isExpanded = false;
  _user: any;

  constructor (private service: AuthService) {

  }

  ngOnInit() {
    this.service.mgr.events.addUserLoaded(function (loadedUser) {
      this._user = loadedUser;
    });
  }

  onSignout() {
    this.service.logout();
  }

}
