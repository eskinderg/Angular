import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
// import { User } from 'oidc-client';
import { ConfirmService } from '../../../theme/components/modal/confirm.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup | undefined;
  public user: any;

  constructor(private fb: FormBuilder, private authService: OAuthService,
    private confirmService: ConfirmService) {
    this.user = this.authService.getIdentityClaims();
  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      'name': ['', [Validators.required]],
      'email': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'website': ['', [Validators.required]],
    });
  }

  onSubmit() {
    // if (this.profileForm.valid) {
      // this.confirmService.openInfoModal({
        // title: 'Profile',
        // message: 'Profile Saved'
      // }).then(() => {
        // this.store.dispatch(new EventsActions.deleteEvent(event));
      // }, () => {
        // console.log();
      // });
    // }
  }

}
