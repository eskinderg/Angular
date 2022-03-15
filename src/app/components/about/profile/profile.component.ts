import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
// import { User } from 'oidc-client';
import { ConfirmService } from '../../../theme/components/modal/confirm.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  public user: any;

  constructor(private fb: FormBuilder, private authService: OAuthService,
    private confirmService: ConfirmService) {
    this.user = this.authService.getIdentityClaims();
  }

  ngOnInit() {
    this.profileForm = new FormGroup({
      name: new FormControl(this.user['given_name'],[
        Validators.required
      ]),
      email: new FormControl(this.user['email'],[
        Validators.required
      ]),
      lastName: new FormControl(this.user['family_name'],[
        Validators.required
      ]),
      website: new FormControl(this.user['website'],[
        Validators.required
      ])
    });
    // this.profileForm = this.fb.group({
    //   'name': ['', [Validators.required]],
    //   'email': ['', [Validators.required]],
    //   'lastName': ['', [Validators.required]],
    //   'website': ['', [Validators.required]],
    // });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.confirmService.openInfoModal({
        title: 'Profile',
        message: 'Profile Saved'
      }).then(() => {
      }, () => {
        console.log();
      });
    }
  }

}
